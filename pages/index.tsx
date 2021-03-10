import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Instrument, Song, Track } from "reactronica";
import { useDebounce } from "use-debounce/lib";
import { makeChord, SynthKey } from "../components/instruments/Synth";
import styles from "../styles/Home.module.css";

export type KeyboardKeys = typeof keyboardKeys;
const keyboardKeys = [
  // top row
  { note: "D#2", keymap: "Digit1" },
  { note: "E2", keymap: "KeyQ" },
  { note: "F2", keymap: "KeyW" },
  { note: "F#2", keymap: "Digit3" },
  { note: "G2", keymap: "KeyE" },
  { note: "G#2", keymap: "Digit4" },
  { note: "A2", keymap: "KeyR" },
  { note: "A#2", keymap: "Digit5" },
  { note: "B2", keymap: "KeyT" },
  { note: "C3", keymap: "KeyY" },
  { note: "C#3", keymap: "Digit7" },
  { note: "D3", keymap: "KeyU" },
  { note: "D#3", keymap: "Digit8" },
  { note: "E3", keymap: "KeyI" },
  { note: "F3", keymap: "KeyO" },
  { note: "F#3", keymap: "Digit0" },
  { note: "G3", keymap: "KeyP" },
  { note: "G#3", keymap: "Minus" },
  { note: "A3", keymap: "BracketLeft" },
  { note: "A#3", keymap: "Equal" },
  { note: "B3", keymap: "BracketRight" },
  // btm row
  { note: "C4", keymap: "KeyZ" },
  { note: "C#4", keymap: "KeyS" },
  { note: "D4", keymap: "KeyX" },
  { note: "D#4", keymap: "KeyD" },
  { note: "E4", keymap: "KeyC" },
  { note: "F4", keymap: "KeyV" },
  { note: "F#4", keymap: "KeyG" },
  { note: "G4", keymap: "KeyB" },
  { note: "G#4", keymap: "KeyH" },
  { note: "A4", keymap: "KeyN" },
  { note: "A#4", keymap: "KeyJ" },
  { note: "B4", keymap: "KeyM" },
  { note: "C5", keymap: "Comma" },
  { note: "C#5", keymap: "KeyL" },
  { note: "D5", keymap: "Period" },
  { note: "D#5", keymap: "Semicolon" },
  { note: "E5", keymap: "Slash" },
  // notes with no keys
  { note: "F5" },
  { note: "F#5" },
  { note: "G5" },
  { note: "G#5" },
  { note: "A5" },
  { note: "A#5" },
  { note: "B5" },
  { note: "C6" },
  { note: "C#6" },
];

export default function Home() {
  const [isChordProgression, setIsChordProgression] = useState(false);
  const [isChord, toggleIsChord] = useState(false);

  const [isMajor, toggleIsMajor] = useState(true);
  const handleShift = (e) => {
    if (e.code === "ShiftLeft") {
      toggleIsMajor((p) => !p);
    }
  };

  const [rootNoteIndex, setRootNodeIndex] = useState(0);
  const [debouncedRootNoteIndex] = useDebounce(rootNoteIndex, 50);
  const handleGetKey = (e) => {
    const keyCode = e.code;
    const index = keyboardKeys.findIndex((k) => k.keymap === keyCode);
    setRootNodeIndex(index);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleShift);
    window.addEventListener("keydown", handleGetKey);
  }, []);

  const [degrees, setDegrees] = useState([]);
  const [debouncedDegrees] = useDebounce(degrees, 50);
  const handleInputDegrees = (e) => {
    setIsChordProgression(false);
    setChordLoop([]);

    const isValid = [...e.target.value].every((v) =>
      parseInt(v, 10) ? true : false
    );
    isValid && setDegrees([...e.target.value].map((v) => parseInt(v, 10)));
  };

  const [chordLoop, setChordLoop] = useState([]);
  const generateChordProgression = (degrees) => {
    const triad = {
      major: [4, 3],
      minor: [3, 4],
      diminished: [3, 3],
    };

    const scale = {
      major: [
        triad.major,
        triad.minor,
        triad.minor,
        triad.major,
        triad.major,
        triad.minor,
        triad.diminished,
      ],
      minor: [
        triad.minor,
        triad.diminished,
        triad.major,
        triad.minor,
        triad.major,
        triad.major,
        triad.major,
        triad.diminished,
      ],
    };

    const scaleType = isMajor ? "major" : "minor";

    const triads = degrees.map((v) => {
      if (v === 0) return null;
      return scale[scaleType][v - 1];
    });
    const notes = degrees.map((degree, i) => {
      const currentTriad = triads[i];

      if (currentTriad === null) return null;

      const makeNote = (rootNoteIndex, degree) => {
        const rule = "WWhWWWh";
        const parsedRule = [...rule].map((step) => {
          if (step === "W") return 2;
          if (step === "h") return 1;
          throw new Error("rule error.");
        });
        const degreeIndex = degree - 1;

        const sliced = parsedRule.slice(0, degreeIndex);
        const scaledNote = rootNoteIndex + sliced.reduce((a, b) => a + b, 0);

        // console.log(parsedRule);
        // console.log("processed", rootNoteIndex, sliced, scaledNote);
        return scaledNote;
      };

      return makeChord(
        keyboardKeys,
        makeNote(rootNoteIndex, degree),
        currentTriad
      );
    });

    return notes;
  };
  useEffect(() => {
    const chordProgressionLoop = generateChordProgression(degrees);
    // console.log("new loop!", degrees, chordProgressionLoop);

    setChordLoop(chordProgressionLoop);
  }, [debouncedRootNoteIndex, debouncedDegrees]);

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isChord ? (isMajor ? "#F2F6D0" : "#71697a") : null,
      }}
    >
      <Head>
        <title>Chordial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Song bpm={60} isPlaying={isChordProgression}>
        <Track>
          {keyboardKeys.map((key, i) => {
            if (!isChord) {
              return (
                <SynthKey
                  key={"note" + i}
                  keyboardIndex={i}
                  keymap={key.keymap}
                  keyboardData={keyboardKeys}
                  type="note"
                />
              );
            }

            return (
              <SynthKey
                key={"chord" + i}
                keyboardIndex={i}
                keymap={key.keymap}
                keyboardData={keyboardKeys}
                type="chord"
                chordType={isMajor ? "major" : "minor"} // TODO: support diminished chord [3,3]
              />
            );
          })}
        </Track>

        {chordLoop.length ? (
          <Track steps={chordLoop}>
            <Instrument type="synth" polyphony={10} />
          </Track>
        ) : null}
      </Song>

      <main className={styles.main}>
        <h1 className={styles.title}>Chordial. make music the cheaty way.</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>start by pressing some keys on your keyboard!</h3>
            <p>try some scales! cheat code: WWhWWWh</p>
            <p>try this: 5,543,3w1,1w,w457w45</p>
          </div>

          <div className={styles.card}>
            <h3>chords (triads)!</h3>
            <div style={{ display: "flex", padding: "5px 0 5px 0" }}>
              <input
                style={{ height: 30, marginRight: 10 }}
                type="checkbox"
                onClick={() => toggleIsChord((p) => !p)}
                name="chord"
              />
              <label htmlFor="chord">
                Ooh what does this tickbox do? (also try tapping left shift!)
              </label>
            </div>
            <br />
            <li>cheat code: root, 3rd, 5th (and do them within a scale)</li>
            <li>Major chords (happy) - 4,3 (semitones)</li>
            <li>Minor chords (sad) - 3,4</li>
            <p>now try the above pattern with chords!</p>
          </div>

          <div className={styles.card}>
            <h3>chord progressions!</h3>

            <li>gimme 4 (or more) numbers between 1 and 6.</li>
            <li>use 0 for silence.</li>
            <li>tick the checkbox below to start looping.</li>
            <li>
              any key you press will be the root note of the chord progression.
            </li>
            <br />
            <input
              type="text"
              name="chord progression"
              placeholder="e.g. 1564"
              onChange={handleInputDegrees}
            />
            <br />
            <div style={{ display: "flex", padding: "5px 0 5px 0" }}>
              <input
                style={{ height: 30, marginRight: 10 }}
                type="checkbox"
                disabled={chordLoop.length === 0}
                checked={isChordProgression}
                onClick={() => setIsChordProgression((p) => !p)}
                name="chordProgression"
              />
              <label htmlFor="chordProgression">
                now tick to play the above chord progression!
              </label>
            </div>
          </div>

          <a
            href="https://www.youtube.com/watch?v=rgaTLrZGlk0"
            target="__blank"
            rel="noreferrer noopener"
            className={styles.card}
          >
            <h3>what else should i add here?</h3>
            <p>Gotta keep watching this youtube video i guess...</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

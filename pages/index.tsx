import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Instrument, Song, Track } from "reactronica";
import { useDebounce } from "use-debounce/lib";
import { BpmSlider } from "../components/BpmSlider";
import { PlayButton, RecordButton } from "../components/Button";
import { BrassKey } from "../components/instruments/Brass";
import { keyboardKeys } from "../mappings/keys";
import { SynthKey } from "../components/instruments/Synth";
import { makeChord } from "../components/instruments/withKey";
import { NoteView, useRecordNotes } from "../components/outputs/NoteView";
import styles from "../styles/Home.module.css";

const handleKeyDown = (keymap, toggleFunc, preventDefault = false) => {
  return (e) => {
    if (e.code === keymap) {
      toggleFunc((p) => !p);
      preventDefault && e.preventDefault();
    }
  };
};

export default function Home() {
  const [isPlayingChordProgression, setIsPlayingChordProgression] = useState(
    false
  );

  const [isChord, toggleIsChord] = useState(false);
  const handleTab = handleKeyDown("Tab", toggleIsChord, true);

  const [isMajor, toggleIsMajor] = useState(true);
  const handleShift = handleKeyDown("ShiftLeft", toggleIsMajor);

  const toggleIsChordProgression = setIsPlayingChordProgression; // const [isPlaying, toggleIsPlaying] = useState(false);
  const handlePlay = handleKeyDown("Space", toggleIsChordProgression, true);

  const [rootNoteIndex, setRootNodeIndex] = useState(0);
  const [debouncedRootNoteIndex] = useDebounce(rootNoteIndex, 50);
  const handleGetKey = (e) => {
    const keyCode = e.code;
    const index = keyboardKeys.findIndex((k) => k.keymap === keyCode);
    setRootNodeIndex(index);
  };

  const [bpm, setBpm] = useState(60);
  const handleNudgeBpm = (e) => {
    const keyCode = e.code;
    switch (keyCode) {
      case "ArrowLeft":
        setBpm((p) => p - 1);
        break;
      case "ArrowRight":
        setBpm((p) => p + 1);
        break;
    }
  };

  const keydownHandlers = [
    handleShift,
    handleTab,
    handleGetKey,
    handlePlay,
    handleNudgeBpm,
  ];
  useEffect(() => {
    keydownHandlers.forEach((handler) => {
      window.addEventListener("keydown", handler);
    });

    return () => {
      keydownHandlers.forEach((handler) => {
        window.removeEventListener("keydown", handler);
      });
    };
  }, []);

  const [degrees, setDegrees] = useState([]);
  const [debouncedDegrees] = useDebounce(degrees, 50);
  const handleInputDegrees = (e) => {
    setIsPlayingChordProgression(false);
    setChordLoop([]);

    const isValid = [...e.target.value].every((v) => {
      const num = parseInt(v, 10);

      if (!num) return false;
      if (num < 0 || num > 6) return false;
      return true;
    });

    isValid
      ? setDegrees([...e.target.value].map((v) => parseInt(v, 10)))
      : setDegrees([]);
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

  const [playedNotes, recordNotes] = useRecordNotes();

  // const [isExpandedNoteView, setIsExpandedNoteView] = useState(false);

  // TODO: load more than 2, use statecharts with xstate
  const [isSynth, toggleSynth] = useState(false);
  const [isBrassReady, setIsBrassReady] = useState(false);

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

      <Song bpm={bpm} isPlaying={isPlayingChordProgression}>
        <Track>
          {keyboardKeys.map((key, i) => {
            if (!isChord) {
              if (isSynth) {
                return (
                  <SynthKey
                    key={"note-synth" + i}
                    keyboardIndex={i}
                    keymap={key.keymap}
                    keyboardData={keyboardKeys}
                    type="note"
                    onNote={recordNotes}
                  />
                );
              }

              return (
                <BrassKey
                  key={"note-brass" + i}
                  keyboardIndex={i}
                  keymap={key.keymap}
                  keyboardData={keyboardKeys}
                  type="note"
                  onNote={recordNotes}
                  isReady={setIsBrassReady}
                />
              );
            }

            if (isSynth) {
              return (
                <SynthKey
                  key={"chord-synth" + i}
                  keyboardIndex={i}
                  keymap={key.keymap}
                  keyboardData={keyboardKeys}
                  type="chord"
                  chordType={isMajor ? "major" : "minor"} // TODO: support diminished chord [3,3]
                  onNote={recordNotes}
                />
              );
            }

            return (
              <BrassKey
                key={"chord-brass" + i}
                keyboardIndex={i}
                keymap={key.keymap}
                keyboardData={keyboardKeys}
                type="chord"
                chordType={isMajor ? "major" : "minor"} // TODO: support diminished chord [3,3]
                onNote={recordNotes}
                isReady={setIsBrassReady}
              />
            );
          })}
        </Track>

        {chordLoop.length ? (
          <Track steps={chordLoop} onStepPlay={recordNotes}>
            <Instrument type="synth" polyphony={10} />
          </Track>
        ) : null}
      </Song>

      <main className={styles.main}>
        <h1 className="text-lg font-semibold text-center sm:text-6xl sm:max-w-2xl">
          Chordial. fun with chords.
        </h1>
        <br />
        <br />

        <div
          className="grid justify-between w-full max-w-5xl grid-cols-3 mx-4 mb-4 transition-opacity ease-in-out"
          // style={{
          //   opacity: isPlayingChordProgression ? 1 : 0.3,
          //   pointerEvents: isPlayingChordProgression ? "all" : "none",
          // }}
        >
          <div className="ml-3">
            <BpmSlider onValue={setBpm} bpm={bpm} />
          </div>
          <div
            className="flex justify-center gap-4 font-semibold"
            onClick={() => toggleSynth((p) => !p)}
          >
            <p className="font-bold text-indigo-500 cursor-pointer">
              {isSynth ? "SYNTH" : "BRASS CHORD"}
            </p>
            {!isSynth ? (
              isBrassReady ? (
                <p className="text-green-500">ready</p>
              ) : (
                <p className="text-pink-700">loading</p>
              )
            ) : null}
          </div>
          <div className="flex items-center justify-end gap-3 mr-3">
            <PlayButton
              onClick={() => setIsPlayingChordProgression((p) => !p)}
              isActive={isPlayingChordProgression}
            />
            <RecordButton
              size={25}
              onClick={() => alert("coming soon!")}
              isActive={false}
              activeColor="red"
            />
          </div>
        </div>
        <div
          className="w-full max-w-5xl transition-all ease-in-out"
          style={{
            height: playedNotes.length ? "fit-content" : "0",
            opacity: playedNotes.length ? "100%" : "0%",
          }}
        >
          <div
            className={
              styles.card + " " + "transition-all ease-in-out overflow-x-hidden"
            }
            style={{
              opacity: playedNotes.length ? "100%" : "0%",
              minHeight: 70,
            }}
            // onClick={() => setIsExpandedNoteView((p) => !p)}
          >
            <NoteView notesBeingPlayed={playedNotes} />
          </div>
        </div>

        <div className="grid w-full max-w-5xl gap-4 mt-10 sm:gap-8 sm:grid-cols-2">
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
                onChange={() => toggleIsChord((p) => !p)}
                checked={isChord}
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
              className="text-lg font-bold text-blue-600"
              type="text"
              name="chord progression"
              placeholder="1564"
              onChange={handleInputDegrees}
              value={degrees.join("")}
            />
            <br />
            <div style={{ display: "flex", padding: "5px 0 5px 0" }}>
              <input
                style={{ height: 30, marginRight: 10 }}
                type="checkbox"
                disabled={chordLoop.length === 0}
                checked={isPlayingChordProgression}
                onClick={() => setIsPlayingChordProgression((p) => !p)}
                name="chordProgression"
              />
              <label htmlFor="chordProgression">play chord progression!</label>
            </div>
            <div className="flex items-center justify-center w-full">
              <BpmSlider onValue={setBpm} bpm={bpm} />
            </div>
          </div>

          <a
            href="https://youtu.be/rgaTLrZGlk0?t=1229"
            target="__blank"
            rel="noreferrer noopener"
            className={styles.card}
          >
            <h3>hooooleeeee</h3>
            <p>so there's something called inversions....</p>
            <br />
            <li>
              the main point of which is to 'bring the chords closer together so
              that the same instrument occupies its own space'
            </li>
            <li>
              plus, reinforce the lowest notes by playing them 1 octave lower
            </li>
          </a>

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

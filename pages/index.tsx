import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Instrument, Song, Track } from "reactronica";
import { SynthKey } from "../components/instruments/Synth";
import styles from "../styles/Home.module.css";

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
];

export default function Home() {
  const [isChord, toggleIsChord] = useState(false);
  const [isMajor, toggleIsMajor] = useState(true);

  const handleShift = (e) => {
    if (e.code === "ShiftLeft") {
      toggleIsMajor((p) => !p);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleShift);
    // window.addEventListener("keyup", handleShift);
  }, []);

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isChord ? (isMajor ? "#F2F6D0" : "#71697a") : null,
      }}
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Song isPlaying={false}>
        <Track>
          {keyboardKeys.map((key, i) => {
            if (!isChord) {
              return (
                <SynthKey
                  key={key.note}
                  notes={[key.note]}
                  keymap={key.keymap}
                />
              );
            }

            const major = [4, 3];
            const minor = [3, 4];

            const triad = isMajor ? major : minor;

            const notes = [
              key.note,
              keyboardKeys[i + triad[0]]?.note || null,
              keyboardKeys[i + triad[0] + triad[1]]?.note || null,
            ].filter(Boolean);

            return (
              <SynthKey
                key={JSON.stringify(notes)}
                notes={notes}
                keymap={key.keymap}
              />
            );
          })}
        </Track>
      </Song>

      <main className={styles.main}>
        <h1 className={styles.title}>press some keys on your keyboard!</h1>

        <br />
        <br />

        <h1 className={styles.title}>scales!</h1>
        <p className={styles.description}>cheat code: WWhWWWh</p>

        <br />
        <br />

        <h1 className={styles.title}>chords (triads)!</h1>
        <br />
        <input
          style={{ height: 30 }}
          type="checkbox"
          onClick={() => toggleIsChord((p) => !p)}
          name="chord"
        />
        <label htmlFor="chord">
          Ooh what does this tickbox do? (also try tapping left shift!)
        </label>
        <p className={styles.description}>
          cheat code: root, 3rd, 5th (and do them within a scale)
        </p>
        <p className={styles.description}>
          Major chords (happy) - 4,3 (semitones) <br />
          Minor chords (sad) - 3,4
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
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

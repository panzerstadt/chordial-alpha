import Head from "next/head";
import React from "react";
import { Instrument, Song, Track } from "reactronica";
import { SynthKey } from "../components/instruments/Synth";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Song isPlaying={false}>
        <Track>
          <SynthKey note="C2" keymap="y" />
          <SynthKey note="D#2" keymap="1" />
          <SynthKey note="E2" keymap="q" />
          <SynthKey note="F2" keymap="w" />
          <SynthKey note="F#2" keymap="3" />
          <SynthKey note="G2" keymap="e" />
          <SynthKey note="G#2" keymap="4" />
          <SynthKey note="A2" keymap="r" />
          <SynthKey note="A#2" keymap="5" />
          <SynthKey note="B2" keymap="t" />
          <SynthKey note="C3" keymap="y" />
          <SynthKey note="C#3" keymap="7" />
          <SynthKey note="D3" keymap="u" />
          <SynthKey note="D#3" keymap="8" />
          <SynthKey note="E3" keymap="i" />
          <SynthKey note="F3" keymap="o" />
          <SynthKey note="F#3" keymap="0" />
          <SynthKey note="G3" keymap="p" />
          <SynthKey note="G#3" keymap="-" />
          <SynthKey note="A3" keymap="[" />
          <SynthKey note="A#3" keymap="=" />
          <SynthKey note="B3" keymap="]" />

          <SynthKey note="C4" keymap="z" />
          <SynthKey note="C#4" keymap="s" />
          <SynthKey note="D4" keymap="x" />
          <SynthKey note="D#4" keymap="d" />
          <SynthKey note="E4" keymap="c" />
          <SynthKey note="F4" keymap="v" />
          <SynthKey note="F#4" keymap="g" />
          <SynthKey note="G4" keymap="b" />
          <SynthKey note="G#4" keymap="h" />
          <SynthKey note="A4" keymap="n" />
          <SynthKey note="A#4" keymap="j" />
          <SynthKey note="B4" keymap="m" />
          <SynthKey note="C5" keymap="," />
          <SynthKey note="C#5" keymap="l" />
          <SynthKey note="D5" keymap="." />
          <SynthKey note="D#5" keymap=";" />
          <SynthKey note="E5" keymap="/" />
        </Track>
      </Song>

      <main className={styles.main}>
        <h1 className={styles.title}>press some keys on your keyboard!</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
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

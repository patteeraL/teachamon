import styles from "@/styles/Battle.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function DotsLoading({ isReady }) {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div className={styles.nameBox}>{isReady ? "Start Battle" : `Waiting${dots}`}</div>;
}

export default function Index() {
  const router = useRouter();
  const [selectedMon, setSelectedMon] = useState("");
  const [monName, setMonname] = useState("");
  const [oppMonId, setOppMonId] = useState("mon2");
  const [oppMonName, setOppMonName] = useState("Trainer");
  const [showOpponent, setShowOpponent] = useState(false);

  useEffect(() => {
    const storedMonId = localStorage.getItem("monId");
    const storedMonName = localStorage.getItem("Monname");

    if (storedMonId === "mon2") {
      setOppMonId("mon1");
    } else {
      setOppMonId("mon2");
    }

    if (storedMonId) {
      setSelectedMon(storedMonId);
    }
    if (storedMonName) {
      setMonname(storedMonName);
    }

    // Wait 5 seconds before revealing opponent info and enabling the battle button
    const timer = setTimeout(() => {
      setShowOpponent(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleBattleStart = () => {
    if (showOpponent) {
      router.push("/battle/battleground");
    }
  };

  return (
    <>
      <Head>
        <title>Battle | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container_wait}>
        {/* Headline */}
        <div className={styles.headline}>
          <h3>Battle</h3>
          <h1>Waiting Room</h1>
        </div>

        {/* Battle Code */}
        <div className={styles.battlecode}>
          <h3>Battle Code</h3>
          <h1>XXXXXX</h1>
        </div>

        {/* Sprites Row */}
        <div className={styles.spritesrow}>
          <div className={styles.spritebox}>
            <p className={styles.monName}>{monName}</p>
            <Image
              src={`/${selectedMon}.svg`}
              width={224}
              height={224}
              className={styles.sprite1}
              alt={selectedMon}
            />
          </div>
          <div className={styles.spritebox}>
            <p className={styles.monName}>
              {showOpponent ? oppMonName : "???"}
            </p>
            <Image
              src={showOpponent ? `/${oppMonId}.svg` : "/mon2.svg"}
              width={224}
              height={224}
              className={showOpponent ? styles.sprite1 : styles.sprite2}
              alt="opponent"
            />
          </div>
        </div>

        {/* Button Sets */}
        <div className={styles.btnsets}>
        <button
          className={`${styles.waitingButton} ${showOpponent ? styles.readyButton : ""}`}
          onClick={handleBattleStart}
        >
          <DotsLoading isReady={showOpponent} />
        </button>
          <Link href="../home" className={styles.cancelButton}>
            Quit
          </Link>
        </div>
      </div>
    </>
  );
}

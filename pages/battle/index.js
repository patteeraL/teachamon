import styles from "@/styles/Battle.module.css";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect} from "react";
/* Battle - Waiting Room */
export function DotsLoading() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className={styles.nameBox}>Waiting{dots}</div>;
}
export default function Index() {
  const [isMatchFound, setMatchFound] = useState(false);
  return (
    <>
      <Head>
        <title>Battle | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container}>
        {/* Headline section aligned to the left */}
        <div className={styles.headline}>
          <h3>Battle</h3>
          <h1>Waiting Room</h1>
        </div>

        {/* Battle code section with smaller text */}
        <div className={styles.battlecode}>
          <h3>Battle Code</h3>
          <h1>XXXXXX</h1>
        </div>

        {/* Sprites aligned horizontally with names */}
        <div className={styles.spritesrow}>
          <div className={styles.spritebox}>
            <p className={styles.monName}>player 1</p>
            <Image src="/mon1.svg" width={224} height={224} className={styles.sprite1} alt="mon1" />
          </div>
          <div className={styles.spritebox}>
            <p className={styles.monName}>???</p>
            <Image src="/mon2.svg" width={224} height={224} className={styles.sprite2} alt="mon2" />
          </div>
        </div>

        {/* Waiting button at the bottom */}
        <div className={styles.btnsets}>
          <button className={styles.waitingButton}><DotsLoading /></button>
          <button className={styles.cancelButton}>Cancel Match</button>
        </div>
      </div>
    </>
  );
}

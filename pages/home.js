import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Index() {
  
  const attackPercentage = 80;
  const defensePercentage = 60; 

  return (
    <>
      <Head>
        <title>Home | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container}>
        <div className={styles.nav}>
          <h3>TEACHAMON</h3>
          <div className={styles.ranking}>
            <h4>Rankings</h4>
            <ol className={styles.orderedList} type="1">
              <li>Thee | 10 wins</li>
              <li>Thee | 10 wins</li>
              <li>Thee | 10 wins</li>
            </ol>
            <h4 className={styles.yourRank}>10. You | 0 wins</h4>
          </div>
        </div>
        <div className={styles.bg}>
          <div className={styles.monname}>
            <h3>Nicks</h3>
          </div>
          <div className={styles.mon}>
            <Image src="/mon1.svg" width={224} height={224} alt="mon" />
          </div>
          <div className={styles.statusbar}>
            <div className={styles.stage}>
              <h5>Stage 1</h5>
              <h5>Lvl.1</h5>
            </div>

            <div className={styles.attacktitle}>
              <h5>Attack</h5>
              <h5>450/500</h5>
            </div>
            <div className={styles.attack}>
              <div
                className={styles.attackBar}
                style={{ width: `${attackPercentage}%` }}
              ></div>
            </div>

            <div className={styles.defensetitle}>
              <h5>Defense</h5>
              <h5>450/500</h5>
            </div>
            <div className={styles.defense}>
              <div
                className={styles.defenseBar}
                style={{ width: `${defensePercentage}%` }}
              ></div>
            </div>
          </div>
          <div className={styles.btngroup}>
            <Link className="mainbtn" href="/train">
              Train
            </Link>
            <Link className="mainbtn" href="/battle">
              Battle
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

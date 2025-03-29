import styles from "@/styles/Home.module.css";
import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Index() {
  const [Monname, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState(''); 
      useEffect(() => {
        
          const storedMonName = localStorage.getItem('Monname');
          const storedMonId = localStorage.getItem('monId');
          if (storedMonName) {
            setMonname(storedMonName);
          }
          if (storedMonId) {
            setSelectedMon(storedMonId);
        }
        }, []);

  const attackPercentage = 90;
  const defensePercentage = 90; 

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
            <h3>{Monname}</h3>
          </div>
          <div className={styles.mon}>
            <Image src= {selectedMon === "mon1" ? "/mon1.svg" : "/mon2.svg"} width={224} height={224} alt="mon" />
          </div>
          <div className={styles.statusbar}>
            <div className={styles.stage}>
              <h4>Stage 1</h4>
              <h4>Lvl.1</h4>
            </div>

            <div className={styles.attackSkill}>
              <h4 className={styles.attacktitle}>Attack</h4>
              <h4 className={styles.percentage}>{attackPercentage*5}/500</h4>
            </div>
            <div className={styles.attack}>
              <div
                className={styles.attackBar}
                style={{ width: `${attackPercentage}%` }}
              ></div>
            </div>

            <div className={styles.defenseSkill}>
              <h4 className={styles.defensetitle}>Defense</h4>
              <h4 className={styles.percentage}>{attackPercentage*5}/500</h4>
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

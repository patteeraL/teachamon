import styles from "@/styles/Home.module.css";
import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Index() {
  const [isPanelOpen, setPanelOpen] = useState(false);
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
          <div className={styles.title}>
            <h5>The Adventure of</h5>
          <h2>TEACHAMON</h2>
          </div>
          
          <div className={styles.ranking}>
            <div className={styles.ranktitle}><h4>Rankings</h4></div>
            <div><ol className={styles.orderedList} type="1">
              <li>Thee | 10 wins</li>
              <li>Ice | 9 wins</li>
              <li>ティチモン | 8 wins</li>
            </ol>
            <h5 className={styles.yourRank}>10. You | 0 wins</h5></div>
           
          </div>
        </div>
        <div className={styles.bg}>
          <div className={styles.monname}>
            <h3>{Monname}</h3>
          </div>
          <div className={styles.mon}>
            <Image src= {selectedMon === "mon1" ? "/mon1.svg" : "/mon2.svg"} width={224} height={224} alt="mon" />
          </div>
          <div className={styles.statusbg}>
          <div className={styles.statusbar}>
            <div className={styles.stage}>
              <h5>Stage 1</h5>
              <h5>Lvl.1</h5>
            </div>

            <div className={styles.attackSkill}>
              <h5 className={styles.attacktitle}>Attack</h5>
              <h5 className={styles.percentage}>{attackPercentage * 5}/500</h5>
            </div>
            <div className={styles.attack}>
              <div
                className={styles.attackBar}
                style={{ width: `${attackPercentage}%` }}
              ></div>
            </div>

            <div className={styles.defenseSkill}>
              <h5 className={styles.defensetitle}>Defense</h5>
              <h5 className={styles.percentage}>{defensePercentage * 5}/500</h5>
            </div>
            <div className={styles.defense}>
              <div
                className={styles.defenseBar}
                style={{ width: `${defensePercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.btngroup}>
            <Link href="/train" legacyBehavior>
              <a className={styles.trainbtn}>Train</a>
            </Link>
            <button className={styles.bttbtn} onClick={() => setPanelOpen(true)}>
              Battle
            </button>
          </div>

          {/* Battle Overlay */}
          {isPanelOpen && (
            <div className={styles.darkpanel}>
              <div className={styles.battleMenu}>
                <h2 className={styles.battleTopic}>Battle</h2>
                
                <div>
                  {/* Create Room and Join Room buttons */}
                  <Link href="/battle" legacyBehavior>
                    <a className={styles.mainbtn}>Create Room</a>
                  </Link>
                  <p>or</p>
                  <input 
                    type="text" 
                    placeholder="Enter Code" 
                    className={styles.inputField} // Use the scoped class
                  />
                  <Link href="/battle" legacyBehavior>
                    <a className={styles.mainbtn2}>Join Room</a> 
                  </Link>

                </div>

                {/* Close button at the top right */}
                <button className={styles.closebtn} onClick={() => setPanelOpen(false)}>
                  &times; {/* 'X' symbol */}
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
}

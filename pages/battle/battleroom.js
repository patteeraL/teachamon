import styles from "@/styles/Battle.module.css";
import Head from "next/head";
import { useEffect, useState } from 'react';
import Image from "next/image";
import ProgressBar from "@/components/progress_bar";
import Link from "next/link";
export default function Battle() {
  const [isEnd, setEnd] = useState(true);
  const [monName, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState('');
  const [oppMonId, setOppMonId] = useState("mon1");
  const [oppMonName, setOppMonName] = useState("Trainer");

  const win = true;

  // State to track disabled buttons
  const [disabledButtons, setDisabledButtons] = useState({
    attack: false,
    stance: false,
    charge: false,
    abort: false,
  });

  // State to track the battle messages
  const [battleMessage, setBattleMessage] = useState("");

  useEffect(() => {
    const storedMonName = localStorage.getItem('Monname');
    const storedMonId = localStorage.getItem('monId');
    const storedoppMonId = localStorage.getItem('oppMonId');
    const storedoppMonName = localStorage.getItem('oppMonName');
    
    if (storedMonName) {
      setMonname(storedMonName);
    }
    if (storedMonId) {
      setSelectedMon(storedMonId);
    }
    if (storedoppMonName) {
      setOppMonName(storedoppMonName);
    }
    if (storedoppMonId) {
      setOppMonId(storedoppMonId);
    }
  }, []);

  const handleButtonClick = (buttonName) => {
    // Disable all buttons
    setDisabledButtons({
      attack: true,
      stance: true,
      charge: true,
      abort: true,
    });

    // Set the battle message
    setBattleMessage(
      `${oppMonName} received -10 HP.` 
    );

    // Enable the clicked button after 5 seconds
    setTimeout(() => {
      setDisabledButtons((prev) => ({
        attack: false,
        stance: false,
        charge: false,
        abort: false,
      }));
      setBattleMessage(""); // Clear the message after 5 seconds
    }, 5000); // 5 seconds timeout
  };

  return (
    <>
      <Head>
        <title>Battle | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.battlebg}>
        <div style={{ marginBottom: "10px" }} className={styles.title}>
          <div className={styles.headline}>
            <h3>Battle</h3>
            <h1>Round 1</h1>
          </div>
        </div>

        <div className={styles.battlegnd}>
          <div className={styles.player} id="player-1">
            <div className={styles.title}>
              <h2>{monName}</h2>
              <h5 style={{ color: "#E55F42" }}>HP</h5><h5>100/100</h5>
              <ProgressBar percentage={100} />
            </div>
            <div>
              <Image style={{ transform: "scale(-1.2, 1.2)" }} src={`/${selectedMon}.svg`} width={186} height={186} alt="mon" />
            </div>
          </div>

          <div style={{ transform: "scale(0.7)" }} className={styles.player} id="player-2">
            <div className={styles.title}>
              <h2>{oppMonName}</h2>
              <h5 style={{ color: "#E55F42" }}>HP</h5><h5>100/100</h5>
              <ProgressBar percentage={100} />
            </div>
            <div>
              <Image src={`/${oppMonId}.svg`} width={186} height={186} alt="mon" />
            </div>
          </div>
        </div>

        <div className={styles.containerH}>
          <div>
            <h6 style={{ margin: "20px 0" }} className={styles.question}>
              Opponent UNUAY is ready for battle!
            </h6>
            <hr />
            <h4 style={{ marginTop: "30px" }}>
              What will <span style={{ color: "#3C80B4" }}>{monName}</span> do?
            </h4>
            <div className={styles.actionbtn}>
              <div>
                <button
                  className={`${styles.attackbutton} ${disabledButtons.attack ? styles.disabledbtn : ""}`}
                  onClick={() => handleButtonClick("attack")}
                  disabled={disabledButtons.attack}
                >
                  Attack
                </button>
                <button
                  className={`${styles.stancebutton} ${disabledButtons.stance ? styles.disabledbtn : ""}`}
                  onClick={() => handleButtonClick("stance")}
                  disabled={disabledButtons.stance}
                >
                  Stance
                </button>
              </div>
              <div>
                <button
                  className={`${styles.chargebutton} ${disabledButtons.charge ? styles.disabledbtn : ""}`}
                  onClick={() => handleButtonClick("charge")}
                  disabled={disabledButtons.charge}
                >
                  Charge
                </button>
                <button
                  className={`${styles.abortbutton} ${disabledButtons.abort ? styles.disabledbtn : ""}`}
                  onClick={() => handleButtonClick("abort")}
                  disabled={disabledButtons.abort}
                >
                  Abort
                </button>
              </div>
            </div>

            {/* Display the battle message */}
            {battleMessage && (
              <div style={{fontSize: "12px"}} className={styles.battleMessage}>
                <p>{battleMessage}</p> <br></br> <h4 style={{ color: "#B4513C", textAlign:"center" }}>Opponent’s Turn</h4>
              </div>
            )}
            {!battleMessage && (
              <div>
              <h4 style={{ color: "#3C80B4", marginTop: "30px", textAlign:"center" }}>Your Turn!</h4>
            </div>
            )}
          {isEnd && (
            <div className={styles.darkpanel}>
              <div className={styles.popup}>
              <h5>{win === true ? "Congratulations!" : "Defeated..."}</h5>
                <Image  src={`/${selectedMon}.svg`} width={186} height={186} alt="mon" />
                <div>
                <h5>{win === true ? "Nicks have Defeated"+{oppMonName}+"!" : "Nicks have been Defeated by"+{oppMonName}+"!"}</h5>
        
                  <p style={{margin:"20px 0", color:"#3CB476"}}>{win === true ? "Exp +110!" : "Exp +55!"}</p>
                  <Link href="../home" legacyBehavior>
                    <a className={styles.mainbtn}>Continue</a>
                  </Link>
                  
                  <Link href="/battle" legacyBehavior>
                    <a style={{marginTop:"10px"}} className={styles.mainbtn2}>Rematch?</a> 
                  </Link>
                </div>
                <button 
                  className={styles.closebtn} 
                  onClick={() => setEnd(false)}
                >
                  &times;
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

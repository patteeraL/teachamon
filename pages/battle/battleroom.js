import styles from "@/styles/Battle.module.css";
import Head from "next/head";
import { useEffect, useState } from 'react';
import Image from "next/image";
import ProgressBar from "@/components/progress_bar";
import Link from "next/link";

export default function Battle() {
  const [isEnd, setEnd] = useState(false);
  const [monName, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState('');
  const [oppMonId, setOppMonId] = useState("mon2");
  const [oppMonName, setOppMonName] = useState("Trainer");
  const [round, setRound] = useState(1);
  const [playerHP, setPlayerHP] = useState(100); // Player's HP
  const [oppHP, setOppHP] = useState(100); // Opponent's HP
  const [xpMath, setXpMath] = useState(0); // Player's XP in Math
  const [xpSci, setXpSci] = useState(0); // Player's XP in Science
  const [chargeStack, setChargeStack] = useState(false); // Charge stack status

  const [battleMessage, setBattleMessage] = useState("");

  const [disabledButtons, setDisabledButtons] = useState({
    attack: false,
    stance: false,
    charge: false,
    abort: false,
  });

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

  const getEnemyAction = () => {
    const actions = ["attack", "stance", "charge"];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    return randomAction;
  };

  const handleButtonClick = (buttonName) => {
    // Disable all buttons
    setDisabledButtons({
      attack: true,
      stance: true,
      charge: true,
      abort: true,
    });

    let message = "";
    let damage = 33; // Default damage value
    let xpReward = 55; // Placeholder for XP reward
    let xpMathIncrease = xpReward / 2;
    let xpSciIncrease = xpReward / 2;

    let enemyAction = getEnemyAction(); // Get the enemy's action randomly

    // Wait for both player's and enemy's action to resolve
    setTimeout(() => {
      let playerActionResult = "";
      let opponentActionResult = "";

      // Player's action processing
      if (buttonName === "attack") {
        if (chargeStack) {
          // Double damage if charged and no stance
          damage = 66;
          setChargeStack(false); // Lose charge stack after attack
        }
        if (oppMonName === "stance") {
          playerActionResult = `${oppMonName} took no damage due to stance!`;
          setOppHP((prev) => prev); // No damage if enemy is in stance
        } else {
          playerActionResult = `${oppMonName} received -${damage} HP from attack.`;
          setOppHP((prev) => prev - damage);
        }
      } else if (buttonName === "stance") {
        playerActionResult = "You took a defensive stance!";
        if (chargeStack) {
          playerActionResult += ` But you still took -33 HP damage from the charged attack!`;
          setPlayerHP((prev) => prev - 33); // Take 33 damage if charge is active
          setChargeStack(false); // Lose charge stack if attacked
        }
      } else if (buttonName === "charge") {
        playerActionResult = "You are charging up for a stronger attack next turn!";
        setChargeStack(true); // Activate charge stack for 1 turn
      } else if (buttonName === "abort") {
        playerActionResult = "Action aborted!";
      }

      // Enemy's action processing
      if (enemyAction === "attack") {
        let enemyDamage = chargeStack ? 66 : 33; // Double damage if enemy is charged
        if (chargeStack) {
          setChargeStack(false); // Lose charge stack after enemy attack
        }
        opponentActionResult = `${monName} received -${enemyDamage} HP from enemy's attack.`;
        setPlayerHP((prev) => prev - enemyDamage);
      } else if (enemyAction === "stance") {
        opponentActionResult = `${monName} took no damage due to the enemy's stance!`;
      } else if (enemyAction === "charge") {
        opponentActionResult = `The enemy is charging up for a stronger attack next turn!`;
      }

      // Set battle message based on the results
      setBattleMessage(`${playerActionResult}\n${opponentActionResult}`);

      // Update round after processing actions
      setTimeout(() => {
        setRound((prevRound) => {

          const nextRound = prevRound + 1;
          if (oppHP <= 0 && playerHP > 0) {
            setEnd(true);
          }
          if (nextRound === 6) {
            setEnd(true); // Game ends, show victory panel
          }
          return nextRound;
        });

        // Reward XP
        setXpMath((prev) => prev + xpMathIncrease);
        setXpSci((prev) => prev + xpSciIncrease);

        // Check if either player has lost
        if (oppHP <= 0) {
          setEnd(true); // Opponent lost, show victory panel
        } else if (playerHP <= 0) {
          setEnd(true); // Player lost, show defeat panel
        }

        setDisabledButtons({
          attack: false,
          stance: false,
          charge: false,
          abort: false,
        });
        setBattleMessage(""); // Clear message after 5 seconds
      }, 2000); // 5 seconds timeout
    }, 2000); // Delay before processing both actions

  };

  const handleAboutButtonClick = () => {
    setEnd(true); // End the game when the About button is clicked
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
            <div className={styles.roundCounter}>
              <span>Round {round}</span>
            </div>
          </div>
        </div>

        <div className={styles.battlegnd}>
          <div className={styles.player} id="player-1">
            <div className={styles.title}>
              <h2>{monName}</h2>
              <h5 style={{ color: "#E55F42" }}>HP</h5><h5>{playerHP}/100</h5>
              <ProgressBar percentage={(playerHP / 100) * 100} />
            </div>
            <div>
              <img style={{ transform: "scale(-1.2, 1.2)" }} src={`/${selectedMon}.gif`} width={186} height={186} alt="mon" />
            </div>
          </div>

          <div style={{ transform: "scale(0.7)" }} className={styles.player} id="player-2">
            <div className={styles.title}>
              <h2>{oppMonName}</h2>
              <h5 style={{ color: "#E55F42" }}>HP</h5><h5>{oppHP}/100</h5>
              <ProgressBar percentage={(oppHP / 100) * 100} />
            </div>
            <div>
              <img src={`/${oppMonId}.gif`} width={186} height={186} alt="mon" />
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

            {battleMessage && (
              <div style={{ fontSize: "12px" }} className={styles.battleMessage}>
                <p>{battleMessage}</p>
              </div>
            )}
            {!battleMessage && (
              <div>
                <h4 style={{ color: "#3C80B4", marginTop: "30px" }}>
                  Your Turn!
                </h4>
              </div>
            )}
          </div>

      

          {isEnd && (
            <div className={styles.darkpanel}>
              <div className={styles.popup}>
              <h5>{oppHP <= 0 ? "Congratulations!" : "Defeated..."}</h5>
                <img  src={`/${selectedMon}.gif`} width={186} height={186} alt="mon" />
                <div>
                  <h5>{oppHP <= 0 ? `Nicks have Defeated ${oppMonName}!` : `Nicks have been Defeated by ${oppMonName}!`}</h5>
          
                  <p style={{margin:"20px 0", color:"#3CB476"}}>{oppHP <= 0 ? "Exp +110!" : "Exp +55!"}</p>
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
    </>
  );
}

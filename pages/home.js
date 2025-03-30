import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Index() {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [Monname, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monster, setMonster] = useState(null);
  const [error, setError] = useState(null);

  // Initialize percentages as 0 or default values
  const [attackPercentage, setAttackPercentage] = useState(0);
  const [defensePercentage, setDefensePercentage] = useState(0);

  useEffect(() => {
    // Load character selection from localStorage
    const storedMonName = localStorage.getItem('Monname');
    const storedMonId = localStorage.getItem('monId');
    if (storedMonName) setMonname(storedMonName);
    if (storedMonId) setSelectedMon(storedMonId);

    // Fetch leaderboard data from view table 
    const fetchLeaderboardData = async () => {
      try {
        const { data: leaderboardData, error } = await supabase
          .from('leaderboard') // Your view table
          .select('username, wins, rank')
          .order('rank', { ascending: true });

        if (error) throw error;

        const topPlayers = leaderboardData.slice(0, 5);
        setLeaderboard(topPlayers);

        // Get current user's rank
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser?.username) {
          const userRankData = leaderboardData.find(
            player => player.username === currentUser.username
          );
          setUserRank(userRankData);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLeaderboard([
          { username: "Thee", wins: 10, rank: 1 },
          { username: "Ice", wins: 9, rank: 2 },
          { username: "ティチモン", wins: 8, rank: 3 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch monster data (xp_math, xp_sci) for the selected monster
    const fetchMonsterData = async () => {
      if (!selectedMon) return;

      try {
        const { data, error } = await supabase
          .from("monsters")
          .select("xp_math, xp_sci")
          .eq("name", selectedMon); // Fetch both xp values for selected monster

        if (error) throw error;

        if (data && data.length > 0) {
          const xpMath = data[0];
          const xpSci = data[1];

          // Calculate attack and defense percentages
          setAttackPercentage(Math.min((xpMath / 500) * 100, 100));
          setDefensePercentage(Math.min((xpSci / 500) * 100, 100));
        } else {
          console.warn("No data found for monster:", selectedMon);
        }
      } catch (err) {
        console.error("Error fetching monster data:", err.message);
        setError(err.message);
      }
    };

    fetchLeaderboardData();
    fetchMonsterData(); // Fetch monster data after leaderboard is fetched

  }, [selectedMon]);  // Re-fetch if selectedMon changes

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

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
            <h4>Rankings</h4>
            {loading ? (
              <div className={styles.loading}>Loading rankings...</div>
            ) : (
              <>
                <ol className={styles.orderedList}>
                  {leaderboard.map((player) => (
                    <li key={`${player.username}-${player.rank}`}>
                      {player.username} | {player.wins} wins
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </div>
        <div className={styles.bg}>
          <div className={styles.monname}>
            <h3>{Monname}</h3>
          </div>
          <div className={styles.mon}>
            <Image 
              src={selectedMon === "mon1" ? "/mon1.svg" : "/mon2.svg"} 
              width={224} 
              height={224} 
              alt="mon" 
              priority
            />
          </div>
          {userRank ? (
            <h4 className={styles.yourRank}>
              You | {userRank.wins} wins
            </h4>
          ) : (
            <h4 className={styles.yourRank}>Unranked | 0 wins</h4>
          )}
          <div className={styles.statusbg}>
            <div className={styles.statusbar}>
              <div className={styles.stage}>
                <h5>Stage 1</h5>
                <h5>Lvl.1</h5>
              </div>

              <div className={styles.attackSkill}>
                <h5 className={styles.attacktitle}>Attack</h5>
                <h5 className={styles.percentage}>{Math.floor(attackPercentage)} / 500</h5>
              </div>
              <div className={styles.attack}>
                <div
                  className={styles.attackBar}
                  style={{ width: `${attackPercentage}%` }}
                ></div>
              </div>

              <div className={styles.defenseSkill}>
                <h5 className={styles.defensetitle}>Defense</h5>
                <h5 className={styles.percentage}>{Math.floor(defensePercentage)} / 500</h5>
              </div>
              <div className={styles.defense}>
                <div
                  className={styles.defenseBar}
                  style={{ width: `${defensePercentage}%` }}
                ></div>
              </div>
            </div>

            <div className={styles.btngroup}>
              <Link href="/train" legacyBehavior>
                <a className={styles.trainbtn}>Train</a>
              </Link>
              <button className={styles.bttbtn} onClick={() => setPanelOpen(true)}>
                Battle
              </button>
            </div>

            {isPanelOpen && (
              <div className={styles.darkpanel}>
                <div className={styles.battleMenu}>
                  <h2 className={styles.battleTopic}>Battle</h2>
                  <div>
                    <Link href="/battle" legacyBehavior>
                      <a className={styles.mainbtn}>Create Room</a>
                    </Link>
                    <p>or</p>
                    <input 
                      type="text" 
                      placeholder="Enter Code" 
                      className={styles.inputField}
                    />
                    <Link href="/battle" legacyBehavior>
                      <a className={styles.mainbtn2}>Join Room</a> 
                    </Link>
                  </div>
                  <button 
                    className={styles.closebtn} 
                    onClick={() => setPanelOpen(false)}
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

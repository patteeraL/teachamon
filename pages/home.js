import styles from "@/styles/Home.module.css";
import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { supabase } from '@/lib/supabase';

export default function Index() {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [Monname, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monster, setMonster] = useState(null);
  const [error, setError] = useState(null);

  const attackPercentage = 90;
  const defensePercentage = 90;

  useEffect(() => {
    // Load character selection from localStorage
    const storedMonName = localStorage.getItem('Monname');
    const storedMonId = localStorage.getItem('monId');
    if (storedMonName) setMonname(storedMonName);
    if (storedMonId) setSelectedMon(storedMonId);

    // Fetch leaderboard data from view table
    const fetchLeaderboardData = async () => {
      try {
        // Fetch top players from the view
        const { data: leaderboardData, error } = await supabase
          .from('leaderboard') // Your view table
          .select('username, wins, rank')
          .order('rank', { ascending: true });

        if (error) throw error;

        // Get top 3 players
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
        // Fallback data if view is empty or error occurs
        setLeaderboard([
          { username: "Thee", wins: 10, rank: 1 },
          { username: "Ice", wins: 9, rank: 2 },
          { username: "ティチモン", wins: 8, rank: 3 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  useEffect(() => {
    const fetchMonster = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("User ID is missing!");
        return;
      }

      try {
        // Fetch the monster data for the logged-in user
        const { data, error } = await supabase
          .from("monsters")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error) {
          console.error("Supabase Fetch Error:", error.message);
          setError(error.message);
          return;
        }

        setMonster(data);
      } catch (err) {
        console.error("Error fetching monster data:", err.message);
        setError(err.message);
      }
    };

    fetchMonster();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!monster) {
    return <p>Loading...</p>;
  }

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
                {userRank ? (
                  <h4 className={styles.yourRank}>
                    You | {userRank.wins} wins
                  </h4>
                ) : (
                  <h4 className={styles.yourRank}>Unranked | 0 wins</h4>
                )}
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

          <div className={styles.statusbar}>
            <div className={styles.stage}>
              <h4>Stage 1</h4>
              <h4>Lvl.1</h4>
            </div>

            <div className={styles.attackSkill}>
              <h4 className={styles.attacktitle}>Attack</h4>
              <h4 className={styles.percentage}>{attackPercentage * 5}/500</h4>
            </div>
            <div className={styles.attack}>
              <div
                className={styles.attackBar}
                style={{ width: `${attackPercentage}%` }}
              ></div>
            </div>

            <div className={styles.defenseSkill}>
              <h4 className={styles.defensetitle}>Defense</h4>
              <h4 className={styles.percentage}>{defensePercentage * 5}/500</h4>
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
              <a className="mainbtn">Train</a>
            </Link>
            <button className="mainbtn" onClick={() => setPanelOpen(true)}>
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
                    <a className={styles.mainbtn}>Join Room</a>
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
    </>
  );
}
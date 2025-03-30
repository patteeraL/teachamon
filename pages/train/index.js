import styles from "@/styles/Train.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import SubjectCard from "@/components/subject_card";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Index() {
  const [subject, setSubject] = useState("");
  const [selectedMon, setSelectedMon] = useState("");
  const [attackPercentage, setAttackPercentage] = useState(0);
  const [defensePercentage, setDefensePercentage] = useState(0);
  
  // Default subjects
  const subjects = ["Maths", "Science"];

  useEffect(() => {
    const fetchMonsterData = async () => {
      if (!selectedMon) return;

      try {
        const { data, error } = await supabase
          .from("monsters")
          .select("xp_math, xp_sci")
          .eq("name", selectedMon);

        if (error) throw error;

        if (data && data.length > 0) {
          const monster = data[0];
          setAttackPercentage(Math.min((monster.xp_math / 500) * 100, 100));
          setDefensePercentage(Math.min((monster.xp_sci / 500) * 100, 100));
        } else {
          console.warn("No data found for monster:", selectedMon);
        }
      } catch (err) {
        console.error("Error fetching monster data:", err.message);
      }
    };

    fetchMonsterData();
  }, [selectedMon]);

  const handleCardClick = (selectedSubject) => {
    setSubject(selectedSubject);
    localStorage.setItem("subject", selectedSubject);
  };

  return (
    <>
      <Head>
        <title>Train | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container}>
        <div>
          <h5>TRAINING</h5>
          <h3>Choose a Subject</h3>
          {subjects.map((sub) => (
            <SubjectCard
              key={sub}
              selected={subject === sub}
              onClick={() => handleCardClick(sub)}
              subject={sub}
            />
          ))}
        </div>

        <div>
          <Link 
            className={`${styles.mainbtn} ${!subject ? styles.disabledBtn : ''}`} 
            style={{ marginTop: '30vh' }}  
            href={`/train/subject`}
          >
            Start Training
          </Link>
        </div>
      </div>
    </>
  );
}

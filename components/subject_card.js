import styles from "@/styles/Home.module.css";
import trainStyles from "@/styles/Train.module.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SubjectCard({ onClick, subject, selected, characterName }) {
  const [xp, setXp] = useState(0); // Store XP from Supabase

  useEffect(() => {
    async function fetchXP() {
      if (!characterName) return; // Ensure characterName exists before querying

      const column = subject === "Maths" ? "xp_math" : "xp_sci";
      const { data, error } = await supabase
        .from("characters")
        .select(column)
        .eq("name", characterName)
        .single();

      if (error) {
        console.error("Error fetching XP:", error);
      } else {
        setXp(data[column] || 0); // Ensure xp is set even if null
      }
    }

    fetchXP();
  }, [subject, characterName]);

  const maxXP = 500; // Set max XP for progress calculation
  const percentage = (xp / maxXP) * 100; // Calculate progress percentage

  const skill = subject === "Maths" ? styles.attackSkill : styles.defenseSkill;
  const bar = subject === "Maths" ? styles.attackBar : styles.defenseBar;
  const type = subject === "Maths" ? styles.attack : styles.defense;
  const title = subject === "Maths" ? styles.attacktitle : styles.defensetitle;
  const type_title = subject === "Maths" ? "Increases Attack XP" : "Increases Defense XP";

  return (
    <div
      className={`${trainStyles.card} ${selected ? trainStyles.clicked : ""}`}
      onClick={onClick}
    >
      <div className={trainStyles.subject}>{subject}</div>
      <div className={skill}>
        <h4 className={title}>{type_title}</h4>
      </div>
      <div className={type}>
        <div className={bar} style={{ width: `${percentage}%` }}></div>
        <div className={skill}>
          <h5>Current XP</h5>
          <h4 className={trainStyles.percentage}>{xp}/500</h4>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Ensure router is imported
import styles from "@/styles/Onboarding.module.css";
import Head from "next/head";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function Index() {
  const [selectedMon, setSelectedMon] = useState("");
  const router = useRouter(); // Initialize router

  const handleImageClick = (monId) => {
    setSelectedMon(monId);
    console.log("Selected Monster ID:", monId);
  };

  const handleSave = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || !selectedMon) return;

    try {
      // Save monster to the database with default stats
      const { error } = await supabase
        .from('monsters')
        .insert({
          user_id: userId,
          monster_type: selectedMon,
          name: "Default Name", // Update this later in the naming step
          level: 1,
          xp_math: 0,
          xp_sci: 0,
          evolution_stage: 1,
          attack: 10,
          defense: 10,
          math_correct: 0,
          science_correct: 0,
        });

      if (error) throw error;

      // Save to localStorage and redirect
      localStorage.setItem('monId', selectedMon);
      router.push('/onboarding/mon');
    } catch (err) {
      console.error("Error saving monster:", err.message);
    }
  };

  useEffect(() => {
    if (selectedMon) {
      localStorage.setItem('monId', selectedMon);
    }
  }, [selectedMon]);

  return (
    <>
      <Head>
        <title>Onboarding | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container}>
        <h2>Choose Your</h2>
        <h2>Disciple!</h2>
        <div className={styles.monoptions}>
          <div
            className={`${styles.monbtn} ${selectedMon === "mon1" ? styles.selected : ""}`}
            onClick={() => handleImageClick("mon1")}
          >
            <img src="/mon1.gif" width={176} height={176} alt="mon1" />
          </div>
          <div
            className={`${styles.monbtn} ${selectedMon === "mon2" ? styles.selected : ""}`}
            onClick={() => handleImageClick("mon2")}
          >
            <img src="/mon2.gif" width={176} height={176} alt="mon2" />
          </div>
        </div>
        <button className="mainbtn" onClick={handleSave}>
          Select
        </button>
      </div>
    </>
  );
}
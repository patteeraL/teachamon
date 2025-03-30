import Trainstyles from "@/styles/Train.module.css";
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

export default function Success() {
  const [subject, setSubject] = useState('');
  const [monName, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState(''); 
  const [xpMath, setXpMath] = useState(0); 
  const [xpSci, setXpSci] = useState(0); 

  useEffect(() => {
    const storedSubject = localStorage.getItem('subject');
    const storedMonName = localStorage.getItem('Monname');
    const storedMonId = localStorage.getItem('monId');
    if (storedSubject) {
      setSubject(storedSubject);
    }
    if (storedMonName) {
      setMonname(storedMonName);
    }
    if (storedMonId) {
      setSelectedMon(storedMonId);
    }
    
    // Fetch monster XP data based on the selected monster
    const fetchMonsterData = async () => {
      if (!selectedMon) return;
      try {
        const { data, error } = await supabase
          .from('monsters')
          .select('xp_math, xp_sci')
          .eq('name', selectedMon);
        
        if (error) throw error;

        if (data && data.length > 0) {
          setXpMath(data[0].xp_math);
          setXpSci(data[0].xp_sci);
        }
      } catch (err) {
        console.error('Error fetching monster data:', err.message);
      }
    };
    
    fetchMonsterData();
  }, [selectedMon]);

  const skillStyle = {
    fontSize: '13px',
    color: subject === 'Maths' ? '#E55F42' : '#6042E5',
  };

  const attackSkill = <>Attack +50xp !</>;
  const defenseSkill = <>Defense +50xp !</>;

  // Function to update XP after a successful answer
  const updateXP = async () => {
    const newXp = subject === 'Maths' ? xpMath + 50 : xpSci + 50;
    const updatedData = subject === 'Maths' ? { xp_math: newXp } : { xp_sci: newXp };

    try {
      const { error } = await supabase
        .from('monsters')
        .update(updatedData)
        .eq('name', selectedMon);

      if (error) {
        console.error("Error updating XP:", error.message);
      } else {
        // Update local state to reflect the new XP
        subject === 'Maths' ? setXpMath(newXp) : setXpSci(newXp);
      }
    } catch (err) {
      console.error("Error updating monster XP:", err.message);
    }
  };

  // Update XP when the component is rendered
  useEffect(() => {
    updateXP();
  }, [subject]);

  return (
    <>
      <Head>
        <title>{subject} | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={Trainstyles.trainbg}>
        <div className={Trainstyles.title}>
          <h5>TRAINING</h5>
          <h3 style={{ color: "#3CB476" }}>Success</h3>
        </div>
        <div className={Trainstyles.row}>
          <div className={Trainstyles.monname}>
            <h3>{monName}</h3>
          </div>
          <div>
            <Image
              src={`/${selectedMon}.svg`}
              width={186}
              height={186}
              alt="mon"
            />
          </div>
        </div>
        <div className={Trainstyles.containerH}>
          <div>
            <p className={styles.monName} style={{ color: "#3C80B4" }}>
              {monName}
            </p>
            <h6 className={styles.question}>
              Thank you so much! I feel a lot smarter!
            </h6>
          </div>
          <div className={Trainstyles.row}>
            <h2 style={{ marginTop: "50px", fontSize: "20px" }}>Total XP</h2>
            <div
              className={subject === "Maths" ? styles.attackSkill : styles.defenseSkill}
            >
              <h4 style={skillStyle}>
                {subject === "Maths" ? attackSkill : defenseSkill}
              </h4>
            </div>
            <div
              className={subject === "Maths" ? styles.attack : styles.defense}
              style={{ marginTop: "10px" }}
            >
              <div
                className={subject === "Maths" ? styles.attackBar : styles.defenseBar}
                style={{
                  width: `${subject === "Maths" ? (xpMath / 500) * 100 : (xpSci / 500) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <Link
              className={Trainstyles.mainbtn}
              style={{ marginTop: "100px" }}
              href="../home"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

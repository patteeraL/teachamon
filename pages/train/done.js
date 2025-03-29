import styles from "@/styles/Train.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Done() {
  const [subject, setSubject] = useState("");
  const [monName, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState(""); 
  const [result, setResult] = useState(null); // Store if the answer was correct

  useEffect(() => {
    const storedSubject = localStorage.getItem("subject");
    const storedMonName = localStorage.getItem("Monname");
    const storedMonId = localStorage.getItem("monId");
    const storedResult = localStorage.getItem("result"); // Get the result

    if (storedSubject) setSubject(storedSubject);
    if (storedMonName) setMonname(storedMonName);
    if (storedMonId) setSelectedMon(storedMonId);
    if (storedResult !== null) setResult(storedResult === "true"); // Convert to boolean

    async function updateXP() {
      if (!monName || result === false) return; // Only update XP on correct answer

      const { data, error } = await supabase
        .from("name")
        .select("xp")
        .eq("name", monName)
        .single();

      if (error || !data) {
        console.error("Error fetching XP:", error);
        return;
      }

      const newXP = data.xp + 50;

      const { error: updateError } = await supabase
        .from("name")
        .update({ xp: newXP })
        .eq("name", monName);

      if (updateError) {
        console.error("Error updating XP:", updateError);
      } else {
        console.log(`${monName} XP updated to ${newXP}`);
      }
    }

    updateXP(); // Call the function inside useEffect
  }, [monName, result]); // Depend on `monName` and `result`

  const skillStyle = {
    marginTop: '20px',
    fontSize: '13px',
    color: subject === 'Maths' ? '#E55F42' : '#6042E5', 
  };

  const correctMessage = (
    <>
      <h6>{monName}: I see! I think I got it now. Thank you!</h6>
      <p style={skillStyle}>
        {subject === "Maths" ? "Attack +50 XP!" : "Defense +50 XP!"}
      </p>
      <Link className={styles.mainbtn} style={{ marginTop: '100px' }} href={`/train/chat`}>
              Next
            </Link>
    </>
  );

  const wrong = (
    <>
      <h6>{monName}: Hmmm.... I don’t think that’s correct. Are you sure about your answer?</h6>
      <div className={styles.retryLinks}>
        <Link className={styles.mainbtn} style={{ marginTop: '100px' }} href={`/train/subject`}>
          Try Again?
        </Link>
        <Link className={styles.mainbtn} style={{ marginTop: '20px' , background: '#4A3206', color: '#F6A714' }}href={`/train/chat`}>
          Skip Question
        </Link>
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>{subject} | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.trainbg}>
        <div className= {styles.title}>
          <h5>TRAINING</h5>
          <h3>{subject}</h3>
        </div>
        <div className={styles.row}>
          <div className={styles.monname}>
            <h3>{monName}</h3>
          </div>
          <div>
            <Image src={`/${selectedMon}.svg`} width={186} height={186} alt="mon" />
          </div>
        </div>
        <div className={styles.containerH}>
          <div>
            <h2 className={styles.done}>
              {result === false ? wrong : correct}
            </h2>
          </div>
        
        </div>
      </div>
    </>
  );
}

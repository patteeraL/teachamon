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
    fontFamily: "Inter",
    color: subject === "Maths" ? "#E55F42" : "#6042E5",
  };

  const correctMessage = (
    <>
      I think that’s correct! <br /> Thank you!!
      <p style={skillStyle}>
        {subject === "Maths" ? "Attack +50 XP!" : "Defense +50 XP!"}
      </p>
    </>
  );

  const wrongMessage = <>I think that’s incorrect <br /> Sorry :(</>;

  return (
    <>
      <Head>
        <title>{subject} | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container}>
        <div>
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
        <div>
          <h2 className={styles.question}>{result ? correctMessage : wrongMessage}</h2>
        </div>
        <div>
          <Link className={styles.mainbtn} href={`/train/chat`}>Next Question</Link>
        </div>
      </div>
    </>
  );
}

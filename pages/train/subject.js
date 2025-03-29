import styles from "@/styles/Train.module.css";
import Choice from "@/components/choice";
import SubjectCard from "@/components/subject_card"; // Import SubjectCard
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Subject() {
  const [subject, setSubject] = useState("");
  const [monName, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState(""); 
  const [selectedChoice, setSelectedChoice] = useState(null); 

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    localStorage.setItem("result", choice === "10100");
  };

  useEffect(() => {
    const storedSubject = localStorage.getItem("subject");
    const storedMonName = localStorage.getItem("Monname");
    const storedMonId = localStorage.getItem("monId");
    if (storedSubject) {
      setSubject(storedSubject);
    }
    if (storedMonName) {
      setMonname(storedMonName);
    }
    if (storedMonId) {
      setSelectedMon(storedMonId);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{subject} | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
        <div className = {styles.trainbg}>
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
          <p className={styles.monName}>{monName}</p><h6 className={styles.question}>
            How do I convert a decimal number into binary?
          </h6>
        </div>
        <Choice onClick={handleChoiceClick} selectedChoice={selectedChoice} choice="10100" />
        <Choice onClick={handleChoiceClick} selectedChoice={selectedChoice} choice="11111" />
        <Choice onClick={handleChoiceClick} selectedChoice={selectedChoice} choice="IDK" />
        <Choice onClick={handleChoiceClick} selectedChoice={selectedChoice} choice="All is correct" />
        <div>
        <Link
  className={`${styles.mainbtn} ${!selectedChoice ? styles.disabledBtn : ''}`}
  style={{ marginTop: '30px' }}  
  type="submit"
  href={`/train/done`}
>
  Submit
</Link>
        </div>
        </div>
        </div>
    </>
  );
}

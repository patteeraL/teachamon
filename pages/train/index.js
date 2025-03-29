import styles from "@/styles/Train.module.css";
import { useEffect, useState } from 'react';
import Head from "next/head";
import SubjectCard from "@/components/subject_card"; 
import Link from "next/link";

export default function Index() {
    const [subject, setSubject] = useState('');
    const handleCardClick = (subject) => {
        setSubject(subject); 
        console.log("subject:", subject);
    };
    useEffect(() => {
    
        localStorage.setItem('subject', subject);
      }, [subject]);
    

  return (
    <>
      <Head>
        <title>Train | Teachamon</title>
        <meta name="keyword" content=""/>
      </Head>
      <div className={styles.container}>
        <div>
          <h5>TRAINING</h5>
          <h3>Choose a Subject</h3>
        
          <SubjectCard
            className={`${styles.monbtn} ${subject === "Maths" ? styles.selected : ""}`}
            onClick={() => handleCardClick("Maths")}
            subject="Maths"
          />
          <SubjectCard
            className={`${styles.monbtn} ${subject === "Science" ? styles.selected : ""}`}
            onClick={() => handleCardClick("Science")}
            subject="Science"
          />
        </div>

        <div>
          <Link 
            className={styles.mainbtn} 
            href={`/train/${subject === "Maths" ? "Maths" : "Science"}`}
          >
            Start Training
          </Link>
        </div>
      </div>
    </>
  );
}

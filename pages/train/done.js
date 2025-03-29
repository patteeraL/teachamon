import styles from "@/styles/Train.module.css"
import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Done() {
 const [selectedSubject, setSubject] = useState('');
 useEffect(() => {
   
     const storedSubject = localStorage.getItem('subject');
     if (storedSubject) {
       setSubject(storedSubject);
     }
   }, []);
  const skillStyle = {
    fontFamily: 'Inter',
    color: selectedSubject === 'Maths' ? '#E55F42' : '#6042E5', 
  };
  const attackSkill = (<>
    Attack +50xp !
  </>);
  const defenseSkill = (<>
    Defense +50xp !
  </>);
  const result = true;
  const correct = (
    <>
      I think that’s correct! <br /> Thank you!!
      <p style={skillStyle}>
        {selectedSubject === "Maths" ? attackSkill : defenseSkill}
      </p>
    </>
  );
  const wrong = (
    <>
      I think that’s incorrect <br /> Sorry:(
    </>
  );
  return (
    <>
      <Head>
        <title>{selectedSubject} | Teachamon</title>
        <meta name="keyword" content=""/>
      </Head>
      <div className={styles.container}>
        <div>
          <h5>TRAINING</h5>
          <h3>{selectedSubject}</h3>
        </div>
        <div className={styles.row}>
          <div className={styles.monname}>
            <h3>Nicks</h3>
          </div>
          <div>
            <Image src="/mon1.svg" width={186} height={186} alt="mon"/>
          </div>
        </div>
        <div>
          <h2 className={styles.question}>
          {result === false ? wrong : correct}
          </h2>
      
        </div>
    
        <div>
          <Link className={styles.mainbtn} href={`/train/${selectedSubject === "Maths" ? "Maths-chat" : "Science-chat"}`}>Next Question</Link>
        </div>
      </div>
    </>
  );
}

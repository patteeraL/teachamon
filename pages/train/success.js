import Trainstyles from "@/styles/Train.module.css"
import styles from "@/styles/Home.module.css"
import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Success() {
  const attackPercentage = 90;
  const defensePercentage = 90; 
  const [subject, setSubject] = useState('');
 useEffect(() => {
   
     const storedSubject = localStorage.getItem('subject');
     if (storedSubject) {
       setSubject(storedSubject);
     }
   }, []);
  const skillStyle = {
    fontFamily: 'Inter',
    color: subject === 'Maths' ? '#E55F42' : '#6042E5', 
  };
  const attackSkill = (<>
    Attack +50xp !
  </>);
  const defenseSkill = (<>
    Defense +50xp !
  </>);
  return (
    <>
      <Head>
        <title>{subject} | Teachamon</title>
        <meta name="keyword" content=""/>
      </Head>
      <div className={Trainstyles.container}>
        <div>
          <h5>TRAINING</h5>
          <h3>Success</h3>
        </div>
        <div className={Trainstyles.row}>
          <div className={Trainstyles.monname}>
            <h3>Nicks</h3>
          </div>
          <div>
            <Image src="/mon1.svg" width={186} height={186} alt="mon"/>
          </div>
        </div>
        <div>
          <h2 className={Trainstyles.question}>
          TYSM!!!
          </h2>
        </div>
        <div className={Trainstyles.row}>
        <div className={subject === "Maths" ? styles.attackSkill : styles.defenseSkill}>
        <h4 style={skillStyle}>
        {subject === "Maths" ? attackSkill : defenseSkill}
      </h4>
            </div>
            <div className={subject === "Maths" ? styles.attack : styles.defense}>
              <div
                className= {subject === "Maths" ? styles.attackBar : styles.defenseBar}
                style={subject === "Maths" ? { width: `${attackPercentage}%` } : { width: `${defensePercentage}%` }}
              ></div>
            </div>
          </div>
        <div>
          <Link className={Trainstyles.mainbtn} href="../home">Back to Menu</Link>
        </div>
      </div>
    </>
  );
}

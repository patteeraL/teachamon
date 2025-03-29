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
  const [monName, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState(''); 

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
  }, []);
  const skillStyle = {
   
    fontSize: '13px',
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
      <div className={Trainstyles.trainbg}>
        <div className= {Trainstyles.title}>
          <h5>TRAINING</h5>
          <h3 style={{color: '#3CB476' }}>Success</h3>
        </div>
        <div className={Trainstyles.row}>
          <div className={Trainstyles.monname}>
            <h3>{monName}</h3>
          </div>
          <div>
            <Image src={`/${selectedMon}.svg`} width={186} height={186} alt="mon"/>
          </div>
        </div>
        <div className={Trainstyles.containerH}>
        <div>
          <p className={styles.monName} style={{color: '#3C80B4' }} >{monName}</p><h6 className={styles.question}>
          Thank you so much!
          I feel a lot smarter!
          </h6>
        </div>
        <div className={Trainstyles.row}>
          <h2 style={{ marginTop: '50px', fontSize: '20px' }} >Total XP</h2>
        <div className={subject === "Maths" ? styles.attackSkill : styles.defenseSkill}>
        <h4 style={skillStyle}>
        {subject === "Maths" ? attackSkill : defenseSkill}
      </h4><p style={{ fontSize: '12px' }}>(400 to 455)</p>
            </div>
            <div className={subject === "Maths" ? styles.attack : styles.defense} style={{ marginTop: '10px' }}>
              <div
                className= {subject === "Maths" ? styles.attackBar : styles.defenseBar}
                style={subject === "Maths" ? { width: `${attackPercentage}%` } : { width: `${defensePercentage}%` }}
              ></div>
            </div>
          </div>
        <div>
          <Link className={Trainstyles.mainbtn} style={{ marginTop: '100px' }} href="../home">Back to Menu</Link>
        </div>
      </div>
      </div>
    </>
  );
}

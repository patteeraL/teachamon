import styles from "@/styles/Train.module.css"
import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Done() {
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
    fontFamily: 'Inter',
    color: subject === 'Maths' ? '#E55F42' : '#6042E5', 
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
        {subject === "Maths" ? attackSkill : defenseSkill}
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
        <title>{subject} | Teachamon</title>
        <meta name="keyword" content=""/>
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
            <Image src={`/${selectedMon}.svg`} width={186} height={186} alt="mon"/>
          </div>
        </div>
        <div>
          <h2 className={styles.question}>
          {result === false ? wrong : correct}
          </h2>
      
        </div>
    
        <div>
          <Link className={styles.mainbtn} href={`/train/chat`}>Next Question</Link>
        </div>
      </div>
    </>
  );
}

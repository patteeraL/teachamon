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
    marginTop: '20px',
    fontSize: '13px',
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
      <h6>{monName}: I see! I think I got it now. Thank you!</h6>
      <p style={skillStyle}>
        {subject === "Maths" ? attackSkill : defenseSkill}
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
        <meta name="keyword" content=""/>
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
            <Image src={`/${selectedMon}.svg`} width={186} height={186} alt="mon"/>
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

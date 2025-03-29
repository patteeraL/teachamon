import styles from "@/styles/Train.module.css"
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import InputAns from "@/components/input_ans";
import { useEffect, useState } from 'react';

export default function MathsChat() {
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
          Can you clarify this?
          Say it in ur own words!
          </h2>
        </div>
        <div className={styles.row}>
         <InputAns/>
        </div>
        <div>
          <Link className={styles.mainbtn} type="submit" href={`/train/success`}>Submit</Link>
        </div>
      </div>
    </>
  );
}

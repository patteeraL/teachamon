import styles from "@/styles/Train.module.css"
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import InputAns from "@/components/input_ans";
import { useEffect, useState } from 'react';

export default function ScienceChat() {
  const [subject, setSubject] = useState('');
  useEffect(() => {
  
    const storedSubject = localStorage.getItem('subject');
    if (storedSubject) {
      setSubject(storedSubject);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Science | Teachamon</title>
        <meta name="keyword" content=""/>
      </Head>
      <div className={styles.container}>
        <div>
          <h5>TRAINING</h5>
          <h3>Science</h3>
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

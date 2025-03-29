import styles from "@/styles/Train.module.css"
import Choice from "@/components/choice";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';

export default function Maths() {
  const [subject, setSubject] = useState('');
  const ans_choices = ["Choice 1", "Choice 2", "Choice 3", "Choice 4"];
  const handleChoiceClick = (choice) => {
    console.log("Choice selected:", choice);
  };
  useEffect(() => {
  
    const storedSubject = localStorage.getItem('subject');
    if (storedSubject) {
      setSubject(storedSubject);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Maths | Teachamon</title>
        <meta name="keyword" content=""/>
      </Head>
      <div className={styles.container_qna}>
        <div>
          <h5>TRAINING</h5>
          <h3>Maths</h3>
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
          <h2 className={styles.question}>Teach me!</h2>
        </div>
        <div>
          <h2 className={styles.question}>
            How do I convert a decimal number into binary?
          </h2>
        </div>
        <div className={styles.row}>
         
          <Choice onClick={handleChoiceClick} choices={ans_choices} />
        </div>
        <div>
          <Link className="mainbtn" type="submit" href={`/train/done`}>Submit</Link>
        </div>
      </div>
    </>
  );
}

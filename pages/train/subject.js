import styles from "@/styles/Train.module.css";
import Choice from "@/components/choice";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';

export default function Subject() {
  const [subject, setSubject] = useState('');
  const [monName, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState(''); 
  const [selectedChoice, setSelectedChoice] = useState(null); 

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    console.log("subject:", choice); 
  };

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
          <h2 className={styles.question}>Teach me!</h2>
        </div>
        <div>
          <h2 className={styles.question}>
            How do I convert a decimal number into binary?
          </h2>
        </div>
        <Choice 
          onClick={handleChoiceClick} 
          selectedChoice={selectedChoice} 
          choice="Choice 1" 
        />
        <Choice 
          onClick={handleChoiceClick} 
          selectedChoice={selectedChoice} 
          choice="Choice 2" 
        />
        <Choice 
          onClick={handleChoiceClick} 
          selectedChoice={selectedChoice} 
          choice="Choice 3" 
        />
        <Choice 
          onClick={handleChoiceClick} 
          selectedChoice={selectedChoice} 
          choice="Choice 4" 
        />
        <div>
          <Link className="mainbtn" type="submit" href={`/train/done`}>Submit</Link>
        </div>
      </div>
    </>
  );
}



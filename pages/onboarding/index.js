import { useEffect, useState } from 'react';
import styles from "@/styles/Onboarding.module.css"
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Index() {
  const [selectedMon, setSelectedMon] = useState("");

  const handleImageClick = (monId) => {
    setSelectedMon(monId); 
    console.log("monId:", monId);
  };


  useEffect(() => {
    if (selectedMon) {
      localStorage.setItem('monId', selectedMon); 
    }
  }, [selectedMon]);

      
  return (
    <>
    <Head>
      <title>Onboarding | Teachamon</title>
      <meta name="keyword" content=""/>
    </Head>
    <div className={styles.container}>
        <h2>Choose Your</h2>
        <h2>
        Disciple!</h2>
        <div className={styles.monoptions}>
        <div
            className={`${styles.monbtn} ${selectedMon === "mon1" ? styles.selected : ""}`}
            onClick={() => handleImageClick("mon1")}
          >
            <Image src="/mon1.svg" width={176} height={176} alt="mon1" />
          </div>
          <div
            className={`${styles.monbtn} ${selectedMon === "mon2" ? styles.selected : ""}`}
            onClick={() => handleImageClick("mon2")}
          >
            <Image src="/mon2.svg" width={176} height={176} alt="mon2" />
          </div>
        </div>
        <Link className="mainbtn" href={`/onboarding/mon`}>
          Select
        </Link>
    </div>
    
    </>
  );
}
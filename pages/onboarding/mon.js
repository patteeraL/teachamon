import styles from "@/styles/Onboarding.module.css"
import Head from "next/head";
import { useEffect, useState } from 'react';
import Image from "next/image";
import InputMonName from "@/components/input_name";
export default function Mon() {
    const [selectedMon, setSelectedMon] = useState('');
    useEffect(() => {
      
        const storedMonId = localStorage.getItem('monId');
        if (storedMonId) {
            setSelectedMon(storedMonId);
        }
      }, []);

    return (
    <>
    <Head>
      <title>Onboarding | Teachamon</title>
      <meta name="keyword" content=""/>
    </Head>
    <div className={styles.container}><h2>Lets Give it a Name!</h2>
    <div className={styles.avatar}><Image src= {selectedMon === "mon1" ? "/mon1.svg" : "/mon2.svg"} width={258} height={258} alt= {selectedMon}/></div>
        <InputMonName/>
    </div>
    
    </>
  );
}
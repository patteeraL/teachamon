import styles from "@/styles/Train.module.css";
import { useEffect, useState } from 'react';
import Head from "next/head";
import SubjectCard from "@/components/subject_card"; 
import Link from "next/link";

export default function Index() {
    const [subject, setSubject] = useState('');

   
    const handleCardClick = (selectedSubject) => {
        setSubject(selectedSubject); 
        console.log("subject:", selectedSubject);
    };


    useEffect(() => {
        if (subject) {
            localStorage.setItem('subject', subject);
        }
    }, [subject]);

    return (
        <>
            <Head>
                <title>Train | Teachamon</title>
                <meta name="keyword" content=""/>
            </Head>
            <div className={styles.container}>
                <div>
                    <h5>TRAINING</h5>
                    <h3>Choose a Subject</h3>
                
                    
                    <SubjectCard
                        selected={subject === "Maths"} 
                        onClick={() => handleCardClick("Maths")}
                        subject="Maths"
                    />
                    <SubjectCard
                        selected={subject === "Science"}
                        onClick={() => handleCardClick("Science")}
                        subject="Science"
                    />
                </div>

                <div>
                    
                    <Link 
                        className={styles.mainbtn} 
                        href={`/train/subject`}
                    >
                        Start Training
                    </Link>
                </div>
            </div>
        </>
    );
}

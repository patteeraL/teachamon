import styles from "@/styles/Train.module.css"
import Head from "next/head";
import SubjectCard from "@/components/subject_card"; 
import Link from "next/link";
export default function Index() {
  return (
    <>
    <Head>
      <title>Train | Teachamon</title>
      <meta name="keyword" content=""/>
    </Head>
    <div className={styles.container}>
        <div><h5>TRAINING</h5>
        <h3>Choose a Subject</h3>
        <SubjectCard subject="Maths" />
        <SubjectCard subject="Science" />
        </div>
        <div>
            <Link className="mainbtn" href="qna">Start Training</Link>
        </div>
        </div>
        
    
    </>
  );
}
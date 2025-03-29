import styles from "@/styles/Train.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import SubjectCard from "@/components/subject_card";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Index() {
  const [subjects, setSubjects] = useState([]); // Store subjects from DB
  const [subject, setSubject] = useState("");

  useEffect(() => {
    async function fetchSubjects() {
      const { data, error } = await supabase.from("subjects").select("name");

      if (error) {
        console.error("Error fetching subjects:", error);
      } else {
        setSubjects(data.map((s) => s.name)); // Extract subject names
      }
    }

    fetchSubjects();
  }, []);

  const handleCardClick = (selectedSubject) => {
    setSubject(selectedSubject);
    localStorage.setItem("subject", selectedSubject);
  };

  return (
    <>
      <Head>
        <title>Train | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container}>
        <div>
          <h5>TRAINING</h5>
          <h3>Choose a Subject</h3>

          {subjects.length > 0 ? (
            subjects.map((sub) => (
              <SubjectCard
                key={sub}
                selected={subject === sub}
                onClick={() => handleCardClick(sub)}
                subject={sub}
              />
            ))
          ) : (
            <p>Loading subjects...</p>
          )}
        </div>

                <div>
                    
                <Link 
                        className={`${styles.mainbtn} ${!subject ? styles.disabledBtn : ''}`} 
                        style={{ marginTop: '30vh' }}  
                        href={`/train/subject`}
                    >
                        Start Training
                    </Link>
                </div>
            </div>
        </>
    );
}

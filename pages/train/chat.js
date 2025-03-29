import styles from "@/styles/Train.module.css"
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import InputAns from "@/components/input_ans";
import { useEffect, useState } from 'react';
import axios from "axios";

export default function MathsChat() {
  const [subject, setSubject] = useState('');
  const [monName, setMonname] = useState(""); 
  const [selectedMon, setSelectedMon] = useState(''); 
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("");
  const question = "What is the Pythagorean Theorem?"; // update to fetch from Supabase

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

  const handleSubmit = async () => {
    // Build a single message string combining the question and user's answer
    const message = `Question: ${question}\n\nUser's answer: ${answer}`;

    try {
      console.log("📤 Sending to API:", message);
      const response = await axios.post("/api/openAI", { message });
      // Destructure the response from the API
      const { feedback, score, answerStatus } = response.data;
      setFeedback(feedback);
      setScore(score);
      setAnswerStatus(answerStatus);
    } catch (err) {
      console.error("AI error:", err);
      setFeedback("Something went wrong while contacting AI.");
    }
  };


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
          <p className={styles.monName}>{monName}</p><h6 className={styles.question}>
           {/* Display feedback if available; otherwise, show the question */}
          {feedback ? feedback : question}
          </h6>
  
    
        {/* Display score and answer status if feedback exists */}
        {feedback && (
          <div className={styles.feedbackDetails}>
            <p>Score: {score}</p>
            <p>Answer Status: {answerStatus}</p>
            <Link className={styles.mainbtn} style={{ marginTop: '100px' }} href={`/train/chat`}>
          Try Again?
        </Link>
        <Link className={styles.mainbtn} style={{ marginTop: '20px' }} href={`/train/success`}>
              Next
            </Link>
          </div>
          
        )}
        

        {/* If no feedback, show the text area and submit button */}
        {!feedback && (
          <>
            <div className={styles.row}>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className={styles.textarea}
              />
            </div>
            <div>
              <button className={styles.mainbtn} style={{marginTop:"50px"}} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </>
        )}
      </div>
      </div>
      </div>
    </>
  );
}
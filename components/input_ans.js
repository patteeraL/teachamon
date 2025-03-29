import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Train.module.css"
export default function InputAns() {
    const [answer, setanswer] = useState(""); 
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();  
    if (Monname.trim()) {
      router.push(`success`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="answer"
        className={styles.input_ans}
        value={answer}
        onChange={(e) => setUsername(e.target.value)}  
        placeholder="Explanation Here"
      />
    </form>
  );
}

import { useState } from 'react';
import styles from "@/styles/Home.module.css";
import trainStyles from "@/styles/Train.module.css";

export default function SubjectCard({ onClick, subject }) {
  const [isClicked, setIsClicked] = useState(false); 

  const skill = subject === "Maths" ? styles.attackSkill : styles.defenseSkill;
  const bar = subject === "Maths" ? styles.attackBar : styles.defenseBar;
  const type = subject === "Maths" ? styles.attack : styles.defense;
  const title = subject === "Maths" ? styles.attacktitle : styles.defensetitle;
  const type_title = subject === "Maths" ? "Attack" : "Defense";

  const attackPercentage = 90;
  const defensePercentage = 90;

  const percentage = subject === "Maths" ? attackPercentage : defensePercentage;

  const handleCardClick = () => {
    setIsClicked(!isClicked); 
    if (onClick) onClick(); 
  };

  return (
    <div
      className={`${trainStyles.card} ${isClicked ? trainStyles.clicked : ''}`} 
      onClick={handleCardClick}
    >
      <div className={trainStyles.subject}>{subject}</div>
      <div className={skill}>
        <h4 className={title}>{type_title}</h4>
        <h4 className={percentage}>{percentage * 5}/500</h4>
      </div>
      <div className={type}>
        <div
          className={bar}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

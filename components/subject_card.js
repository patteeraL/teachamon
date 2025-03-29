import styles from "@/styles/Home.module.css";
import trainStyles from "@/styles/Train.module.css";

export default function SubjectCard({ subject }) {
  
    const skill = subject === "Maths" ? styles.attackSkill : styles.defenseSkill;
  const bar = subject === "Maths" ? styles.attackBar : styles.defenseBar;
  const type = subject === "Maths" ? styles.attack : styles.defense;
  const title = subject === "Maths" ? styles.attacktitle : styles.defensetitle;
  const type_title = subject === "Maths" ? "Attack" : "Defense";

  const attackPercentage = 90; 
  const defensePercentage = 90; 
  

  const percentage = subject === "Maths" ? attackPercentage : defensePercentage;



  return (
    <div className={trainStyles.card}>
        <div className={trainStyles.subject}>{subject}</div>
      <div className={skill}>
              <h4 className={title}>{type_title}</h4>
              <h4 className={percentage}>{percentage*5}/500</h4>
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


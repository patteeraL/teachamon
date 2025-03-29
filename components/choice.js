import styles from "@/styles/Train.module.css";

export default function Choice({ onClick, choices, selectedChoice }) {
  return (
    <div className={styles.choicecontainer}>
      {choices.map((choice, index) => (
        <div
          key={index}
          className={`${styles.choicebutton} ${selectedChoice === choice ? styles.clicked : ''}`} 
          onClick={() => onClick(choice)} 
        >
          {choice}
        </div>
      ))}
    </div>
  );
}

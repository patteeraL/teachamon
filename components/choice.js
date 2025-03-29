import styles from "@/styles/Train.module.css";

export default function Choice({ onClick, selectedChoice, choice }) {
    return (
      <button
        className={`${styles.choicebutton} ${selectedChoice === choice ? styles.clicked : ''}`}
        onClick={() => onClick(choice)}  
        style={selectedChoice === choice ? { background: '#9b9999' } : {}} 
      >
        {choice}
      </button>
    );
  }
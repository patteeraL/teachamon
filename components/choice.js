import styles from "@/styles/Train.module.css";

export default function Choice({ onClick, choices }) {
  return (
    <div className={styles["choice-container"]}>
      {choices.map((choice, index) => (
        <div
          key={index}
          className={styles["choice-button"]}
          onClick={() => onClick(choice)}
        >
          {choice}
        </div>
      ))}
    </div>
  );
}

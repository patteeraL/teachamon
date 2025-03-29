import styles from "@/styles/Battle.module.css";

export default function ProgressBar({ percentage }) {

  const progress = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={styles.progressContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
      >
    
      </div>
    </div>
  );
}

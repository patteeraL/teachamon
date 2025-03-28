import styles from "@/styles/Home.module.css"
import Head from "next/head";
import Link from "next/link";
export default function Index() {
  return (
    <>
    <Head>
      <title>Home | Teachamon</title>
      <meta name="keyword" content=""/>
    </Head>
    <div className={styles.container}>
      <div className={styles.nav}>
        <h3>TEACHAMON</h3>
        <div className={styles.ranking}><h4>Rankings</h4>
        <ol className={styles.orderedList} type="1">
        <li>Thee | 10 wins</li>
        <li>Thee | 10 wins</li>
        <li>Thee | 10 wins</li>
      </ol>
        </div>
        </div>
      <div className={styles.bg}>
        <div className={styles.monname}></div>
      <div className={styles.btngroup}>
      <Link className="mainbtn" href="/train">
          Train
    </Link>
    <Link className="mainbtn" href="/battle">
          Battle
    </Link>
    </div>
      </div>
   
    </div>
    
    </>
  );
}
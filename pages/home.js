import styles from "@/styles/Home.module.css"
import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <>
    <Head>
      <title>Home | Teachamon</title>
      <meta name="keyword" content=""/>
    </Head>
    <div className={styles.container}><h3>The Adventure of</h3><h1>TEACHAMON</h1>
    <Link className="mainbtn" href="/train">
          Train
    </Link>
    <Link className="mainbtn" href="/battle">
          Battle
    </Link>
    </div>
    
    </>
  );
}
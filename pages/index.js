import { useState } from "react";
import styles from "@/styles/Login.module.css";
import Head from "next/head";
import InputLogin from "@/components/input_login"; 

export default function Index() {
  const [showLoginForm, setShowLoginForm] = useState(null);  

  const handleLoginClick = () => {
    setShowLoginForm("login"); 
  };

  const handleSignUpClick = () => {
    setShowLoginForm("signup");  
  };

  return (
    <>
      <Head>
        <title>Login | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container}>
        <h3>The Adventure of</h3>
        <h1>TEACHAMON</h1>

        
        {showLoginForm && <InputLogin formType={showLoginForm} />}

        
        {!showLoginForm && (
          <>
            <button className="mainbtn" onClick={handleLoginClick}>
              Log in
            </button>
            <button className="mainbtn" onClick={handleSignUpClick}>
              Sign up
            </button>
          </>
        )}
      </div>
    </>
  );
}

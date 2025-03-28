import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css"
export default function InputLogin() {
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");  
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
   
    console.log("Username:", username);
    console.log("Password:", password);
   
    router.push("/onboarding"); 
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}  
        placeholder="Name"
      />
      <input
        type="password"  
        name="password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}  
        placeholder="Password"
      />
      <button type="submit" className="mainbtn">
        Submit
      </button>
    </form>
  );
}

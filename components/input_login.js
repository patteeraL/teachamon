import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import styles from "@/styles/Login.module.css";

export default function InputLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Authenticate user
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) throw error;

      // Store user info
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userId', user.id);

      // Check if the user already has a monster
      const { data: monster, error: monsterError } = await supabase
        .from('monsters')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (monsterError) {
        // No monster found, redirect to onboarding
        router.push('/onboarding');
      } else {
        // Monster exists, save to localStorage and redirect to home
        localStorage.setItem('monId', monster.monster_type);
        localStorage.setItem('Monname', monster.name);
        router.push('/home');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <input
        type="text"
        name="username"
        className={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide password" : "Show password"}
        </button>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <button
        type="submit"
        className={styles.mainbtn}
        disabled={loading}
      >
        {loading ? "Loading..." : "Log in"}
      </button>
    </form>
  );
}
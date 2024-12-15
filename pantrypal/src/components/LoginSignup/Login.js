import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Login = ({ setIsSignedIn }) => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  // Focus on email input when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Clear error messages whenever user or password changes
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user,
        password: pwd,
      });

      if (error) {
        console.error("Sign In Error:", error.message);
        setErrMsg(error.message);
        return;
      }

      console.log("Sign In successful:", data);
      setIsSignedIn(true); // Update the parent state in App.js
      navigate("/");
      
    } catch (error) {
      console.error("Error during login:", error);
      setErrMsg("An error occurred during login.");
    }

    // Clear form fields after submission
    setUser('');
    setPwd('');
  };

  return (
    <div>
      <h1>Welcome back to PantryPal!</h1>
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Need an Account?<br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
    </div>
  );
};

export default Login;

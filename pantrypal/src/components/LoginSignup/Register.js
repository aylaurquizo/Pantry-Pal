import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from '../../supabaseClient';
import bcrypt from 'bcryptjs';
import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FULLNAME_REGEX = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [fullName, setFullName] = useState('');
    const [validFullName, setValidFullName] = useState(false);
    const [fullNameFocus, setFullNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const[errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = FULLNAME_REGEX.test(fullName);
        console.log(result);
        console.log(fullName);
        setValidFullName(result);
    }, [fullName]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: pwd,
                options: {
                    data: {
                      display_name: fullName,
                    }
                  }
              })

              if (error) {
                console.error("Authentication Error:", error.message);
                setErrMsg(error.message);
                return;
            } else {
                console.log("Authentication successful:", error);

                const { errorr } = await supabase
                .from('User')
                .insert({ email: email, name: fullName })

                setSuccess(true);
                setErrMsg('');
                navigate('/login');
            }
            
        } catch (error) {
            console.error("Error during registration:", error);
            setErrMsg("An error occurred during registration");
        }

    }    
  return (
    <div>
        <h1>Welcome to PantryPal!</h1>
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="full_name">
                Full Name:
                <span className={validFullName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validFullName || !fullName ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
                type="text" 
                id="fullName" 
                ref={userRef} 
                autoComplete="off"
                onChange={(e) => setFullName(e.target.value)} 
                required 
                aria-invalid={validFullName ? "false" : "true"} 
                aria-describedby="uidnote" 
                onFocus={() => setFullNameFocus(true)} 
                onBlur={() => setFullNameFocus(false)} 
            />
            <p id="uidnote" className={fullNameFocus && fullName && !validFullName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Enter first and last name.
            </p>
            <label htmlFor="username">
                Email:
                <span className={validEmail ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
                type="text" 
                id="username" 
                ref={userRef} 
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)} 
                required 
                aria-invalid={validEmail ? "false" : "true"} 
                aria-describedby="uidnote" 
                onFocus={() => setEmailFocus(true)} 
                onBlur={() => setEmailFocus(false)} 
            />
            <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Enter valid email address.
            </p>

            <label htmlFor="password">
                Password:
                <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}  />
                </span>
                <span className={validPwd || !pwd ? "hide" : "indvalid"}>
                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                </span>
            </label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: 
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span> 
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span> 
                <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
                Confirm Password:
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
            </p>

            <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>
        </form>
        <p>
            Already registered?<br />
            <span className="line">
                <Link to="/">Sign In</Link>
            </span>
        </p>
    </section>
    </div>
  )
}

export default Register

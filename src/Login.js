import { useEffect, useState } from "react";
import "./Login.css"; // Keep the CSS import as is
import { supabase } from './SupabaseClient.js'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();
  const [errormsg,setErrorMsg]=useState("");
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrorMsg("");
  };
 const handleSignUp =async(e)=> {
  e.preventDefault();
  setErrorMsg("");
    const {data,error}= await supabase.auth.signUp({
      email,
      password,
      options:{
        data:{ 
          name,
        }
      }
    })
    if(error){
     setErrorMsg(error.message);
      
    }
    else{
      alert("Check your email for confirmation")
      setEmail("");
    setPassword("");
    setName("")
    }
  }
const handleLogin=async(e) =>{
  e.preventDefault();
  setErrorMsg("");
    const {data,error}=await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/dashboard");
    }
  }
  return (
    <div className="login-page">  
      <div className="login-container">
        <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <div className="login-headers">
          <h2 id="login">{isSignUp ? "Create a new account" : "Welcome back"}</h2>
          <p>{isSignUp ? "" : "Enter your credentials to log in"}</p>
        </div>

        {isSignUp && (
          <div className="login-form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name"value={name} placeholder="John Doe" onChange={(e)=>setName(e.target.value)}/>
          </div>
        )}

        <div className="login-form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email"  value={email} placeholder="example@email.com"onChange={(e)=>setEmail(e.target.value)} />
        </div>

        <div className="login-form-group">
          <label htmlFor="pass">Password</label>
          <input type="password" name="pass" id="pass" value={password} placeholder="••••••••" onChange={(e)=>setPassword(e.target.value)}/>
        </div>

        <div className="login-options">
          <label className="login-remember">
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" className="login-forgot">Forgot password?</a>
        </div>
        {errormsg && (
            <div className="login-error-message">
              {errormsg}
            </div>
          )}

        <button id="login-btn">{isSignUp ? "Create account" : "Log in"}</button>

        <p className="login-footer">
          {isSignUp ? (
            <>Already have an account? <span className="login-toggle" onClick={toggleForm}>Sign in</span></>
          ) : (
            <>Don’t have an account? <span className="login-toggle" onClick={toggleForm}>Sign up</span></>
          )}
        </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

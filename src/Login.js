import './Login.css'

const Login=()=>{
return(
    <div className="login-cont">
        <div className="login">
            <div className="s1">
                <h1 className="s2 text-[#7A26F7] text-2xl font-bold m-6" >SwiftHire</h1>
                <p>Log in to track your job applications</p>
            </div>
            <form>
                <div className="form-field">
                <div>
                    <input type="email" placeholder="Enter Email" className="" required />
                </div>
                <div>
                    <input type="password" placeholder="Password" className="" required />
                </div></div>
                <div className="rem-forgot">
                    <input type="checkbox" className="" id="remember"/>
                    <label htmlFor="remember">Remember Me</label>
                    <a id="pass"href="#">Forgot Password?</a>
                </div>
                <div>
                    <div>
                        <button id="login-btn" className="bg-[#7A26F7]  h-13 rounded-xl text-[#FFFFFF] ">Log In</button>
                    </div>
                </div>
                <div>
                    <div>
                        <button>or continue with</button>
                    </div>
                </div>
                <div className="linked-git">
                    <div className="LinkedIn "><button>LinkedIn</button></div>
                    <div className="Github"><button>GitHub</button></div>
                </div>
                <div className="">
                    <p>Dont have an account ? <a href="#">Signup</a></p>
                </div>
            </form>
        </div>
    </div>
    
)

}

export default Login;
import { useState } from "react";
import "./loginpage.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";


function Login() {
  const [isError, setIsError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
 
  const navigate = useNavigate()



  const handleSubmit = async(e) =>{
    e.preventDefault()
    setIsError("")
    setIsLoading(true)

    const formData = new FormData(e.target)
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      const res = await apiRequest.post('/auth/login',{username, password})
      console.log(res.data)
      navigate('/')
    } catch (err) {
      setIsError(err.response.data.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button >Login</button>
          {isError && <span>{isError}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import Newsfeed from '../postingpage/Newsfeed.jsx'

const Login = (props) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [zip, setZip] = useState('')
    const [county, setCounty] = useState('')
    
    const [message, setMessage] = useState('')



    const handleSubmit = async (e) => {
        try {
          e.preventDefault()
          // post to backend with form data
          const userInfo = {
            username: username,
            email: email,
            password: password,
            zip: zip,
            county: county
          }
    
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, userInfo)
    
          const { token } = response.data
    
          // save the response jwt in local storage
          localStorage.setItem('jwtToken', token)
    
          // decode jwt and set the app state to the jwt payload
          const decoded = jwt_decode(token)
          console.log(decoded)
    
          props.setCurrentUser(decoded)
    
        } catch(error) {
          // if the login failed -- display a message
          if(error.response.status === 400) {
            setMessage('bad user name or password')
          } else {
            console.error(error)
          }
        }
      }
    
      // if check to see if the user is logged in, redirect to the profile
      if(props.currentUser) return <Redirect to='/newsfeed' component={ Newsfeed } currentUser={ props.currentUser }/>

        

    return (
        <div className="loginAreaContainer">
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div class="loginContainer">
                <h1 id="loginText">Log in to your account</h1>
                <label id="usernameInputLabel" htmlFor='usernameInput'>Username</label>
                <input id="usernameInput" type="text" placeholder="username" onChange={ e => setUsername(e.target.value)}></input>
                
                {/* <label id="emailInputLabel" htmlFor='emailInput'>Email</label>
                <input id="emailInput" type="email" placeholder="email" onChange={ e => setEmail(e.target.value)}></input> */}

                <label id="passwordInputLabel" htmlFor='passwordInput'>Password</label>
                <input id="passwordInput" type="password" placeholder="password" onChange={ e => setPassword(e.target.value)}></input>

                {/* <label id="zipInputLabel" htmlFor='zipInput'>Zipcode</label>
                <input id="zipInput" type="zip" placeholder="zip" onChange={ e => setZip(e.target.value)}></input>

                <label id="countyInputLabel" htmlFor='countyInput'>County</label>
                <input id="countyInput" type="county" placeholder="county" onChange={ e => setCounty(e.target.value)}></input> */}

                <input id="signUpSubmitBtn" type="submit" value="Log in"></input>
                </div>
            </form>
        </div>
    )
}

export default Login
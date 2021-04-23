import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Newsfeed from '../postingpage/Newsfeed.jsx'
import { Redirect } from 'react-router-dom'

const SignUp = (props) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [zip, setZip] = useState('')
    const [county, setCounty] = useState('')

    // const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            
            const userInfo = {
                username: username,
                email: email,
                password: password,
                zip: zip,
                county: county
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, userInfo)
            console.log(response);
            const { token } = response.data
            localStorage.setItem('jwtToken', token)
            console.log("helloooooooooooooooooooooooooooooooooooooooooo", token);
            // decode jwt and set the app state to the jwt payload
            const decoded = jwt_decode(token)
            console.log(decoded)

            props.setCurrentUser(decoded)

        } catch (error) {
            // if(error.response.status === 400) {
            //   // set the message to be whatever it is on the server end
            //   setMessage(error.response.data.msg)
            // }else{
              console.log(error)
            }
    }

    if(props.currentUser) return <Redirect to='/newsfeed'  component={ Newsfeed } currentUser={props.currentUser} />

    return (
        <div>
            <div className="signUpAreaContainer">
                {/* <p>{message}</p> */}
                <form id="signUpForm" onSubmit={handleSubmit}>
                    <div className="signUpContainer">
                    <h1 id="mainText">RelateD</h1>
                    <label id="usernameInputLabel" htmlFor='usernameInput'>Username</label>
                    <input id="usernameInput" type="text" placeholder="username" onChange={ e => setUsername(e.target.value)}></input>
                    
                    <label id="emailInputLabel" htmlFor='emailInput'>Email</label>
                    <input id="emailInput" type="email" placeholder="email" onChange={ e => setEmail(e.target.value)}></input>

                    <label id="passwordInputLabel" htmlFor='passwordInput'>Password</label>
                    <input id="passwordInput" type="password" placeholder="password" onChange={ e => setPassword(e.target.value)}></input>
                    
                    <label id="zipInputLabel" htmlFor='zipInput'>Zipcode</label>
                    <input id="zipInput" type="zip" placeholder="zip" onChange={ e => setZip(e.target.value)}></input>

                    <label id="countyInputLabel" htmlFor='countyInput'>County</label>
                    <input id="countyInput" type="county" placeholder="county" onChange={ e => setCounty(e.target.value)}></input>

                    <input id="signUpSubmitBtn" type="submit" value="Sign up"></input>
                    </div>
                    <h1 id="alreadyMsg">Already have an account? <Link id="alreadyLink" to='/login' >Sign in here</Link></h1>
                </form>
            </div>
        </div>
    )
}

export default SignUp
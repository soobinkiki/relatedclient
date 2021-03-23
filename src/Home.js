// import { Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import Navbar from './components/mainpage/Navbar.jsx'
import SignUp from './components/mainpage/Signup.jsx'
import Login from './components/mainpage/Login.jsx'
import Contact from './components/mainpage/Contact.jsx'
import Profile from './components/mainpage/Profile.jsx'

import Newsfeed from './components/postingpage/Newsfeed.jsx'


function Home() {

    const [currentUser , setCurrentUser] = useState(null)

    // userEffect if the user navigates away from the site and comes back
    // purpose of this useEffect is to make app still working even after the website refresh
    useEffect( () => {
        const token = localStorage.getItem('jwtToken')
        if(token) {
            // decode the token if it is found in local storage
            const decoded = jwt_decode(token)
            setCurrentUser(decoded)
        } else {
            setCurrentUser(null)
        }
    }, [])

    // deletes the jwt from local storage when the use wants to log out
    const handleLogout = () => {
        if (localStorage.getItem('jwtToken')) {
            localStorage.removeItem('jwtToken')
            setCurrentUser(null)
        }
    }

    return (
        <div>
            <Router >
                <header>
                    <Navbar currentUser={currentUser} handleLogout={handleLogout}/>
                </header>
                    <Route exact path='/' render={(props) => <SignUp {...props} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
                    <Route exact path='/login' render={(props) => <Login {...props} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
                    <Route exact path='/newsfeed' render={(props) => <Newsfeed {...props} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
                    <Route exact path='/contact' render={() => <Contact />}/>
                    <Route exact path='/profile' render={(props) => <Profile {...props} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
            </Router>
        </div>   
    )
}

export default Home;

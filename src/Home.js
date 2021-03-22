// import { Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/mainpage/Navbar.jsx'
import SignUp from './components/mainpage/Signup.jsx'
import Login from './components/mainpage/Login.jsx'
import Newsfeed from './components/postingpage/Newsfeed.jsx'


function Home() {

    const [currentUser , setCurrentUser] = useState(null)

    const handleLogout = () => {
        console.log('log user out!!');
    }


    return (
        <div className="temp">
            <Router >
                <Navbar currentUser={currentUser} handleLogout={handleLogout}/>
                <Route exact path='/' render={(props) => <SignUp {...props} />}/>
                <Route exact path='/login' render={(props) => <Login {...props} />}/>
                <Route exact path='/newsfeed' component= {Newsfeed}/>
            </Router>
        </div>   
  );
}

export default Home;

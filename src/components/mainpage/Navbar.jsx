// import { Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import '../../main.css'


const Navbar = (props) => {
    

    return (

        <div className="navlogo-container">
            {!props.currentUser ? 
                <Link to='/' id="mainLink"><h1 id="NavText">RelateD Logo here</h1></Link> : null}                
            <nav className="nav-container">
                {!props.currentUser ? 
                    <Link to='/' id="mainLink"><h1 id="NavText">Home</h1></Link> : null}
                {!props.currentUser ? 
                    <Link to='/profile' id="mainLink"><h1 id="NavText">Proflile</h1></Link> : null}
                {!props.currentUser ? 
                    <Link to='/newsfeed' id="mainLink"><h1 id="NavText">Newsfeed</h1></Link> : null}
                {!props.currentUser ? 
                    <Link to='/logout' id="mainLink"><h1 id="NavText">Logout</h1></Link> : null}
            </nav>
        </div>
        
    )
}

export default Navbar
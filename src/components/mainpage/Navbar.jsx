// import { Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import Logo from '../../images/relatedlogo.png'
import '../../main.css'


const Navbar = (props) => {
    
    const loggedIn = (
        <div className="navlogo-container">
            <Link to='/' id="mainNavLink"><img id="mainNavText" src={Logo} alt="related-logo" /></Link>
            {/* <Link to='/' id="mainNavLink"><h1 id="mainNavText">RelateD</h1></Link> */}
            <nav className="mainNavList">
                <Link to='/profile' id="mainLink"><h1 id="NavText">Profile</h1></Link>
                <Link to='/newsfeed' id="mainLink"><h1 id="NavText">Newsfeed</h1></Link>
                <Link to='/' id="mainLink" onClick={props.handleLogout}><h1 id="NavText">Logout</h1></Link>
                <Link to='/contact' id="mainLink"><h1 id="NavText" className="NavTextContact">Contact</h1></Link>
            </nav>
        </div>
    )

    const loggedOut = (
        <div className="navlogo-container">
            <Link to='/' id="mainNavLink"><img id="mainNavText" src={Logo} alt="related-logo" /></Link>
            <Link to='/contact' id="mainLink"><h1 id="NavText" className="NavTextContact">Contact</h1></Link>
        </div>
    )

    return (
        <div>
            {props.currentUser ? loggedIn : loggedOut}
        </div>
    )
}

export default Navbar
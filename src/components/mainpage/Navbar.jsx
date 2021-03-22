// import { Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import '../../main.css'


const Navbar = (props) => {
    
    // props.currentUser('jae')

    return (
        <div className="nav-container">
            {!props.currentUser ? 
            <Link to='/' id="mainLink"><h1 id="NavText">RelateD Logo here</h1></Link> : null}
        </div>
            
    )
}

export default Navbar
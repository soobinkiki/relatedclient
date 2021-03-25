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
import ImageUpload from './components/mainpage/Imageupload.jsx'

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

    // const [fileInputState, setFileInputState] = useState('')
    // const [previewSource, setPreviewSource] = useState('')
    // const [selectedFile, setSelectedFile] = useState('')

    // const handleFileInputChange = (e) => {
    //     const file = e.target.files[0]
    //     previewFile(file)
    // }
    // const previewFile = (file) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //         setPreviewSource(reader.result)
    //     }
    // }

    // const handleSubmitFile = (e) => {
    //     e.preventDefault()
    //     if(!previewSource) return
    //     uploadImage(previewSource)
    // }

    // const uploadImage = async (base64EncodedImage) => {
    //     console.log(base64EncodedImage);
    //     try {
    //         await fetch('/api/upload', { method: "Post", body: JSON.stringify({data: base64EncodedImage}), headers: {'Content-type': 'application/json'}})
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    

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

            <ImageUpload />
            {/* <div>
                <h1>Upload</h1>
                <form onSubmit={handleSubmitFile}>
                    <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState}></input>
                    <button type="submit">Submit</button>
                </form>
                {previewSource && (< img src={previewSource} alt="chosen" style={{height: '300px'}}/>)}
            </div> */}
        </div>   
    )
}

export default Home;

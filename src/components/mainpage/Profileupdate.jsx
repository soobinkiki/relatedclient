import axios from 'axios'
import { useState } from 'react'
// import { propTypes } from 'react-bootstrap/esm/Image'

const Profileupdate = (props) => {

    
    const [aboutme, setAboutme] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
  
            const token = localStorage.getItem('jwtToken')
            console.log(e.target.values)
            const authHeaders =  {
                'Authorization': token
            }
            const userRequest = {
                'edited_profile': aboutme
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile`, 
                                    userRequest, { headers: authHeaders })
            const datas = response.data
            
            props.setKeys(Object.keys(datas))
            props.setUserValues(Object.values(datas))
            
            console.log(datas);
        } catch (error) {
            console.log((error));
        }
    }
   
    return (
        <div className="aboutMeUpdateContainer">
            <form onSubmit={handleSubmit}>
                <label id="aboutMeText" htmlFor="aboutMe">Update about me</label>
                <input id="aboutMeArea" type="text" placeholder="About me" onChange={(e) => setAboutme(e.target.value)}></input>
                <input type="submit" value="Change"></input>
            </form>
        </div>
    )
}

export default Profileupdate
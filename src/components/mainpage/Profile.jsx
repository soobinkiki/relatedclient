import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import Profileupdate from './Profileupdate.jsx'
import ImageUpload from './Imageupload.jsx'


const Profile = (props) => {

    const [userkeys, setKeys] = useState([])
    const [uservalues, setUserValues] = useState([])

    const [imageSelected, setImageSelected] = useState('')

   
    useEffect( () =>{
        const getUserInfo = async function () {
            try {
                const token = localStorage.getItem('jwtToken')
                
                const authHeaders =  {
                    'Authorization': token
                }
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile`, { headers: authHeaders })
                const datas = response.data
                setKeys(Object.keys(datas))
                setUserValues(Object.values(datas))
            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo()
    }, [])

    return (
        <div>

        <div className="profile-container">
            <div className="profileWelcomeMsg">
                <h1 id="profileWelcome">Welcome to RelateD</h1>
            </div>

            <div className="profileInfos">
                <div class="userKeys">
                    {userkeys.map(userkey => <div>{userkey}</div>)}
                </div>
                <div class="userValues">
                    {uservalues.map(uservalue => {
                        if (!uservalue) {
                            return <div>-</div>
                        } else if (Array.isArray(uservalue)) {
                            return <div>-</div>
                        } else {
                            return <div>{uservalue}</div>
                        }
                    })}
                </div>
                <div className="profileUpdate">
                    <Profileupdate {...props} userkeys={userkeys} setKeys={setKeys} setUserValues={setUserValues} />
                </div>
                <div>
                <ImageUpload />
                </div>
            </div>
        </div>    

       
        </div>
    )
}

export default Profile
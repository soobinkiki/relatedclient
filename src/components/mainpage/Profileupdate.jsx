// import axios from 'axios'
// import { useState } from 'react'

// const Profileupdate = () => {

    

//     const handleSubmit = async (e) => {
//         try {
//             e.preventDefault()
  

//             const updateProfile = async function () {
//                 try {
//                     const token = localStorage.getItem('jwtToken')
                    
//                     const authHeaders =  {
//                         'Authorization': token
//                     }
//                     const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile`, { headers: authHeaders })
//                     const datas = response.data
    
//                     console.log(datas);
//                 } catch (error) {
//                     console.log(error);
//                 }
//             }
            
//         } catch (error) {
//             console.log((error));
//         }
   


//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="aboutMe"></label>
//                 <input id="aboutMe" type="text" placeholder="About me"></input>
//                 <input type="submit" value="Change"></input>
//             </form>
//         </div>
//     )
// }

// export default Profileupdate
import { useState, useEffect } from 'react'
import axios from 'axios'



const Reply = (props) => {

    // const [userCanEdit, setUserCanEdit] = useState(false)
    // const [editButtons, setEditButtons] = useState([])
    // useEffect(updateUserCanEdit, [])
    const [usersWhoLiked, setUsersWhoLiked] = useState(props.usersWhoLiked)




    // const updateUserCanEdit = () => {
    //     if(props.currentUser.id === props.user._id){
    //         console.log("User has been authenticated to edit this post! Cognrats")
    //         setUserCanEdit(true)

    //         const sample_buttons =
    //         <div>
    //         <button>Delete</button>
    //         <button>Edit</button>
    //         </div> 
    //         setEditButtons(sample_buttons)
    //     }
    // }
    const handleLike = async() => {
        const token = localStorage.getItem('jwtToken')
                
        const authHeaders =  {
            'Authorization': token
        }
        const likedReply = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/replies/${props.replyId}/like-the-reply`, {"nothign":"nothing"},{ headers: authHeaders })
        console.log(likedReply)
        setUsersWhoLiked(likedReply.data.users_who_liked)
    }



    return(<div class="replyContainer">
            <p>{props.username}</p>
            <p> {props.create.split("T")[0]}</p>
            <p>{props.content}</p>
            {/* {editButtons} */}
            <button onClick={handleLike}>Like Reply ({usersWhoLiked.length} liked) </button>

    </div>)
}

export default Reply
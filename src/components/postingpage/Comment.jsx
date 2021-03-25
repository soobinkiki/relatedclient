import { useState, useEffect } from 'react'
import Reply from './Reply'
import axios from 'axios'


const Comment = (props) => {

    const [childrenReplyArray, setChildrenReplyArray] = useState([])
    const [replyVisibility, setReplyVisibility] = useState(false)
    const [userCanEdit, setUserCanEdit] = useState(false)
    const [editButtons, setEditButtons] = useState([])

    const [usersWhoLiked, setUsersWhoLiked] = useState(props.usersWhoLiked)


    const updateUserCanEdit = () => {

        if(props.currentUser.id === props.user._id){
            console.log("User has been authenticated to edit this post! Cognrats")
            setUserCanEdit(true)

            const sample_buttons =
            <div>
            <button>Delete</button>
            <button>Edit</button>
            </div> 
            setEditButtons(sample_buttons)
        }
    }

    const createObjecToRenderChildren = () => {
        setChildrenReplyArray([])

        const childrenObject = props.replyChildren

        const replies = []
        if (replyVisibility) {

            for (let key in childrenObject) {
                console.log(childrenObject[key])
                const sampleReply = <Reply
                    username={childrenObject[key].user.username}
                    content={childrenObject[key].content}
                    create={childrenObject[key].createdAt}
                    currentUser={props.currentUser}
                    user={childrenObject[key].user}
                    replyId={childrenObject[key]._id}
                    usersWhoLiked={childrenObject[key].users_who_liked}
                    key={key}
                />

                replies.push(sampleReply)

            }
        } else {
            console.log("replies not visible!")
        }

        setChildrenReplyArray(replies)

    }
    useEffect(createObjecToRenderChildren, [])
    useEffect(updateUserCanEdit, [])
    useEffect(createObjecToRenderChildren, [props])
    useEffect(createObjecToRenderChildren, [replyVisibility])

    const setReplyVisibilityToTrue = () => {
        setReplyVisibility(true)
    }

    const handleLike = async() => {
        const token = localStorage.getItem('jwtToken')
                
        const authHeaders =  {
            'Authorization': token
        }
        const likedComment = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/comments/${props.commentId}/like-the-comment`, {"nothign":"nothing"},{ headers: authHeaders })
        console.log(likedComment)
        setUsersWhoLiked(likedComment.data.users_who_liked)
    }


    return (
        <div class="commentContainer">
            <p>{props.username}</p>
            <p> {props.create.split("T")[0]}</p>
            <p>{props.content}</p>
            {editButtons}
            <button onClick={setReplyVisibilityToTrue}>Expand {props.replyChildren.length} Replies</button>
            <button onClick={handleLike}>Like Comment ({usersWhoLiked.length} liked) </button>
            {childrenReplyArray}
        </div>
    )
}

export default Comment
import { useState, useEffect } from 'react'
import Reply from './Reply'
import axios from 'axios'


const Comment = (props) => {

    const [childrenReplyArray, setChildrenReplyArray] = useState([])
    const [replyVisibility, setReplyVisibility] = useState(false)
    const [userCanEdit, setUserCanEdit] = useState(false)
    const [editButtons, setEditButtons] = useState([])
    const [replyText, setReplyText] = useState("")
    const [usersWhoLiked, setUsersWhoLiked] = useState(props.usersWhoLiked)


    const updateUserCanEdit = () => {

        if (props.currentUser.id === props.user._id) {
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

    const handleLike = async () => {
        const token = localStorage.getItem('jwtToken')

        const authHeaders = {
            'Authorization': token
        }
        const likedComment = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/comments/${props.commentId}/like-the-comment`, { "nothign": "nothing" }, { headers: authHeaders })
        console.log(likedComment)
        setUsersWhoLiked(likedComment.data.users_who_liked)
    }
    const submitAReply = async(e) => {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken')

        const authHeaders = {
            'Authorization': token
        }
        console.log(props.commentId)
        const newReply = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/comments/${props.commentId}/add-reply`, { "content": replyText }, { headers: authHeaders })
        console.log(newReply)

        const replyObject = newReply.data.findComment
        console.log(replyObject)
        console.log(childrenReplyArray)
        try {
            const tempArray = childrenReplyArray
            const replyToAdd = <Reply
                username={props.currentUser.username}
                content={replyText}
                create={replyObject.updatedAt}
                currentUser={props.currentUser}
                user={props.currentUser}
                replyId={replyObject.replies[replyObject.replies.length - 1]._id}
                usersWhoLiked={[]}
                key={replyObject._id}
            />
            console.log(replyToAdd)
            console.log(childrenReplyArray)

            if (childrenReplyArray.length >= 1) {
                setChildrenReplyArray([...childrenReplyArray, replyToAdd])
            }
            else {
                setChildrenReplyArray([replyToAdd])
            } //this if/else condition found to be necessary for some reason
        }
        catch (err) {
            console.log(err)
            console.log(childrenReplyArray)

        }
    }


    return (
        <div class="commentContainer">
            <p>{props.username}</p>
            <p> {props.create.split("T")[0]}</p>
            <p>{props.content}</p>
            {editButtons}
            <button onClick={setReplyVisibilityToTrue}>Expand {props.replyChildren.length ? props.replyChildren.length : 0} Replies</button>
            <button onClick={handleLike}>Like Comment ({usersWhoLiked.length} liked) </button>

            {childrenReplyArray}

            <form onSubmit={submitAReply}>
                <input type="text" class="replyArea" placeholder="Write your Reply" onChange={e => setReplyText(e.target.value)}></input>
                <input type="submit" Value="submit" />
            </form>
        </div>
    )
}

export default Comment
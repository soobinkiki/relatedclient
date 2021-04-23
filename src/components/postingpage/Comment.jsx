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
                <div id="commentEditBtn">
                    <button id="fourBtnEdit">Edit</button>
                    <button id="fourBtnDelete">Delete</button>
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
            // const tempArray = childrenReplyArray
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
        <div className="commentContainer">
            <div className="commentUserAndDate">
                <p>{props.username} - </p>
                <p>{props.create.split("T")[0]}</p>
                <div className="fourBtnContainer">
                    <div className="commentFourBtn">
                        <button id="FourBtn" className="FourBtnSeePrev" onClick={setReplyVisibilityToTrue}>See {props.replyChildren.length ? props.replyChildren.length : 0} previous replies</button>
                        <button id="FourBtn" onClick={handleLike}>Like ({usersWhoLiked.length} liked) </button>
                    </div>
                    {editButtons}
                </div>

            </div>
            <div className="replyUserAndDate">
                <p id="replyContent">{props.content}</p>
            </div>
            {/* <hr id="commentHr" /> */}
            <div>
                {childrenReplyArray}
            </div>
            <form onSubmit={submitAReply} >
                <label htmlFor="replyArea" id="labelForReplyArea">{props.currentUser.username}</label>
                <input type="text" id="replyArea" placeholder="Add a reply..." onChange={e => setReplyText(e.target.value)}></input>
                <input type="submit" Value="submit" />
            </form>
            <hr id="commentHr"/>
        </div>
    )
}

export default Comment
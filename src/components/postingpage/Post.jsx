import { useState, useEffect } from 'react'
import Comment from './Comment'
import axios from 'axios'


const Post = (props) => {

    // const temp = props.tags.forEach(tag => <div>#{tag}</div>)
    //const [commentChildren, setCommentChildren] = useState 
    const [childrenCommentArray, setChildrenCommentArray] = useState([])
    const [userCanEdit, setUserCanEdit] = useState(false)
    const [editButtons, setEditButtons] = useState([])
    const [commentText, setCommentText] = useState("")
    const [usersWhoLiked, setUsersWhoLiked] = useState(props.usersWhoLiked)
    const [counter,setCounter] = useState(0)
    const [editedPost, setEditedPost] = useState(props.content)
    const [sampleEditForm, setSampleEditForm] = useState([])




    const handleDelete = async() => {
        const token = localStorage.getItem('jwtToken')
                
        const authHeaders =  {
            'Authorization': token
        }
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${props.postId}/delete-post`, { headers: authHeaders })
        console.log(response.data)
        props.setPostHasBeenDeleted(props.postHasBeenDeleted+1)

    }
    const handleEditSend = async(e) => {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken')


        const authHeaders =  {
            'Authorization': token
        }
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${props.postId}/edit-post`, {"content":editedPost}, { headers: authHeaders })
        console.log(response.data)
    }

    // async function randomFunction (e) {
        
    //     setEditedPost(e.target.value)
    //     console.log(editedPost);
    // }

    const handleEdit = async(e) => {
        e.preventDefault()
        console.log("handle edit has been clicked")

        const div = 
        <div>
            <form onSubmit={handleEditSend}>
                <input type="text" placeholder="Write your edited comment here" onChange={e => setEditedPost(e.target.value)}></input>
                <input type="submit" value="submit"/>
            </form>
        </div>
        setSampleEditForm(div)
    }
    console.log(editedPost)

    const updateUserCanEdit = () => {
        if(props.currentUser.id === props.user._id){
            console.log("User has been authenticated to edit this post! Cognrats")
            setUserCanEdit(true)

            const sample_buttons =
            <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>

            </div> 
            setEditButtons(sample_buttons)
        }
    }



    const createObjecToRenderChildren = () => {

        // setChildrenCommentArray([])
        // console.log("function is invoked, but not state is set as yet")

        const childrenObject = props.commentChildren
        const comments = []
        
        // console.log(props.commentChildren)
        if (counter === 1) {
            console.log("state should indeed be hit")

            for (let key in childrenObject) {


                const sampleComment = <Comment
                    username={childrenObject[key].user.username}
                    content={childrenObject[key].content}
                    create={childrenObject[key].createdAt}
                    replyChildren={childrenObject[key].replies}
                    currentUser={props.currentUser}
                    user={childrenObject[key].user}
                    commentId={childrenObject[key]._id}
                    usersWhoLiked={childrenObject[key].users_who_liked}
                    key={key}
                    
                />

                comments.push(sampleComment)

            }
        } else {
            //console.log("comments not visible!")
        }
        try{
        setChildrenCommentArray([...childrenCommentArray,...comments])
        }
        catch(err){
            console.log(err)
            console.log(props)
        }
    }
    useEffect(updateUserCanEdit, [])
    useEffect(createObjecToRenderChildren, [])
    useEffect(createObjecToRenderChildren, [counter])


    const setCommentVisibilityToTrue = () => {
        setCounter(counter + 1)
    }

    const handleLike = async() => {
        const token = localStorage.getItem('jwtToken')
                
        const authHeaders =  {
            'Authorization': token
        }
        const likedPost = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${props.postId}/like-the-post`, {"nothign":"nothing"},{ headers: authHeaders })
        console.log(likedPost)
        setUsersWhoLiked(likedPost.data.findPost.users_who_liked)
    }
    const submitAComment = async(e) => {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken')
                
        const authHeaders =  {
            'Authorization': token
        }
        const newComment = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${props.postId}/add-comment`,{"content":commentText}, { headers: authHeaders })
        const commentObject = newComment.data.findPost
        try{

        const commentToAdd =  <Comment
                    username={props.currentUser.username}
                    content={commentText}
                    create={commentObject.updatedAt}
                    replyChildren={[]}
                    currentUser={props.currentUser}
                    user={props.currentUser}
                    commentId={commentObject.comments[commentObject.comments.length - 1]._id}
                    usersWhoLiked={[]}
                    key={commentObject._id}
                    
                />
    
        if(childrenCommentArray.length>=1){
        setChildrenCommentArray([...childrenCommentArray,commentToAdd])
        }
        else{
            setChildrenCommentArray([commentToAdd])
        } //this if/else condition found to be necessary for some reason
        }
        catch(err){
            console.log(err)
            console.log(childrenCommentArray)
        }
    }
    return (
        // <div>

        //     <div className="postingSection">
        //         <div className="postTags">{props.tags.map((tag, idx) => <p id="tags" key={idx}>{"#" + tag}</p>)}</div> 
        //         {/* <div>{props.comments}</div> */}

        //     </div>

        <div>

            <div className="postingContainer">
                <div className="userAndDate">
                    <p id="postUsername">{props.username} - </p>
                    <p id="postDate"> {props.create.split("T")[0]}</p>
                </div>
                <div>
                    <p id="postContent">{props.content}</p>
                    {sampleEditForm}

                </div>

                <hr id="hr" />
                <div className="prevCommentAndLikeBtn">
                    <button id="expandPrevComment" onClick={setCommentVisibilityToTrue}>&#9997;See {childrenCommentArray.length || props.commentChildren.length} previous comments</button>
                    <button id="LikePostBtn" onClick={handleLike}>&#128077;Like Post ({usersWhoLiked.length} liked)</button>
                    {editButtons}
                </div>
                
                <div>
                    {childrenCommentArray}
                </div>
                <div className="userAndComment">

                    <div id="postCurrentuser">{props.currentUser.username}</div>
                    <form onSubmit={submitAComment}>
                        <input type="text" id="commentArea" placeholder="Write your comment" onChange={e => setCommentText(e.target.value)}></input>
                        <input type="submit" Value="submit"/>

                    </form>


                </div>
            </div>
        </div>
    )

}

export default Post



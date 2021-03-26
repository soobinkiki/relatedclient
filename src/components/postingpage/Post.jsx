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
        // setChildrenCommentArray([])
        console.log("function is invoked, but not state is set as yet")

        const childrenObject = props.commentChildren
        const comments = childrenCommentArray
        
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

        setChildrenCommentArray(comments)

    }
    useEffect(updateUserCanEdit, [])
    useEffect(createObjecToRenderChildren, [props])
    useEffect(createObjecToRenderChildren, [counter])


    const setCommentVisibilityToTrue = () => {
        console.log("this is hit")
        console.log("counter is at " + counter)
        setCounter(counter + 1)
    }

    const handleLike = async() => {
        const token = localStorage.getItem('jwtToken')
                
        const authHeaders =  {
            'Authorization': token
        }
        const likedPost = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${props.postId}/add-coment`, {"nothign":"nothing"},{ headers: authHeaders })
        console.log(likedPost)
        setUsersWhoLiked(likedPost.data.findPost.users_who_liked)
    }
    const submitAComment = async(e) => {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken')
                
        const authHeaders =  {
            'Authorization': token
        }
        const newComment = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/`,{"content":commentText}, { headers: authHeaders })
        const commentObject = newComment.data//.createPost
        console.log(commentObject)
        console.log(childrenCommentArray)
        try{
        const tempArray = childrenCommentArray

        const commentToAdd =  <Comment
                    username={commentObject.user.username}
                    content={commentObject.content}
                    create={commentObject.createdAt}
                    replyChildren={[]}
                    currentUser={props.currentUser}
                    user={commentObject.user}
                    commentId={commentObject._id}
                    usersWhoLiked={[]}
                    key={commentObject._id}
                    
                />
        setChildrenCommentArray(...childrenCommentArray,commentToAdd)
        //setChildrenCommentArray(tempArray2)
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
        // // </div>

        // <div>
        //     <div>
        //         <div className="postContent">{props.content}</div>
        //     </div>



        // </div>
        <div>

            <div className="postingContainer">
                <div className="userAndDate">
                    <p id="postUsername">{props.username} - </p>
                    {<p id="postDate"> {props.create.split("T")[0]}</p>}
                </div>
                <div>
                    <p id="postContent">{props.content}</p>
                </div>
                <hr id="hr" />
                <button onClick={setCommentVisibilityToTrue}>Expand {childrenCommentArray ? childrenCommentArray.length : "loading"} comments</button>
                 <button onClick={handleLike}>Like Post ({usersWhoLiked.length} liked)</button>
                 {editButtons}
                
                <div>
                    {childrenCommentArray}
                </div>
                <div className="userAndComment">

                    <div id="postCurrentuser">Need help</div>
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



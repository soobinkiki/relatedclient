import { useState, useEffect } from 'react'
import Comment from './Comment'

const Post = (props) => {


    // const temp = props.tags.forEach(tag => <div>#{tag}</div>)
    //const [commentChildren, setCommentChildren] = useState 
    const [childrenCommentArray, setChildrenCommentArray] = useState([])
    const [commentVisibility, setCommentVisibility] = useState(false)
    const [userCanEdit, setUserCanEdit] = useState(false)
    const [editButtons, setEditButtons] = useState([])

    const updateUserCanEdit = () => {
        console.log(props.user)
        console.log(props.currentUser)
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
        //console.log(props)
        //console.log(props.commentChildren)
        //console.log(Object.values(props.commentChildren))
        //console.log(childrenCommentArray)
        setChildrenCommentArray([])

        const childrenObject = props.commentChildren

        const comments = []
        if (commentVisibility) {

            for (let key in childrenObject) {


                const sampleComment = <Comment
                    username={childrenObject[key].user.username}
                    content={childrenObject[key].content}
                    create={childrenObject[key].createdAt}
                    replyChildren={childrenObject[key].replies}
                    currentUser={props.currentUser}
                    key={key}
                />

                comments.push(sampleComment)

            }
        } else {
            console.log("comments not visible!")
        }

        setChildrenCommentArray(comments)

    }
    useEffect(createObjecToRenderChildren, [])
    useEffect(updateUserCanEdit, [])
    useEffect(createObjecToRenderChildren, [props])
    useEffect(createObjecToRenderChildren, [commentVisibility])

    const setCommentVisibilityToTrue = () => {
        setCommentVisibility(true)
    }

    const handleLike = () => {

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
                <button onClick={setCommentVisibilityToTrue}>Expand {props.commentChildren.length} comments</button>
                 <button onClick={handleLike}>Like Post ({props.usersWhoLiked.length} liked)</button>
                 {editButtons}
                
                <div>
                    {childrenCommentArray}
                </div>
                <div className="userAndComment">

                    <div id="postCurrentuser">Need help</div>
                    <form>
                        <input type="text" id="commentArea" placeholder="Write your comment"></input>
                    </form>


                </div>

            </div>

        </div>
    )

}

export default Post



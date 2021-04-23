import axios from 'axios'
import { useState, useEffect } from 'react'
import Post from './Post.jsx'

const Newsfeed = (props) => {

    // 20 objects
    const [informations, setInformations] = useState([])

    const [postText, setPostText] = useState("")
    const [postTitle, setPostTitle] = useState("")
    const [contentModifiedCounter, setPostCounter] = useState(0)
    const [postHasBeenDeleted, setPostHasBeenDeleted] = useState(0)

    const submitAPost = async(e) => {
        try{
        e.preventDefault()
        // console.log(informations)
        // console.log("hitting the submit orute")
        // console.log(postText)
        const token = localStorage.getItem('jwtToken')
                
        const authHeaders =  {
            'Authorization': token
        }
        const newPost = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/`,{"content":postText}, { headers: authHeaders })
        const postObject = newPost.data//.createPost
        // console.log(newPost)
        // const newInformations = informations.unshift(postObject)
        // // console.log(newInformations)
        console.log(postObject)
        //const tempArray = informations.reverse()
        setInformations([ postObject,...informations ])
        //console.log(informations)
        // console.log(informations[0])
        // console.log(informations[60])
        //setPostCounter(postCounter + 1)
        // console.log(newPost.data.createPost

    } catch(err){
        console.log(err)

    }

    }
    useEffect(() =>{
        console.log(postHasBeenDeleted)
        const userInfo = async function () {
            try {
                const token = localStorage.getItem('jwtToken')
                
                const authHeaders =  {
                    'Authorization': token
                }
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/`, { headers: authHeaders })
                const datas = response.data.findPosts
                const storages = Object.values(datas).reverse()
                setInformations(storages)

            } catch (error) {
                console.log(error);
            }
        }
        userInfo()
    }, [postHasBeenDeleted])//, postCounter])
    
//    const postArray = informations ? 
return (
    <div className="newsfeed-container">
        <div></div>
        <div className="navInNewsfeed">
            <h1>Home</h1>
            <h1>Local News</h1>
            <h1>Local Meetups</h1>
        </div>
        <div>
            <div>
                {/* <label id="postSubmitLabel">New Post</label> */}
                <form onSubmit={submitAPost}>

                <input id="postInput" placeholder="Post a message here" onChange={ e => setPostText(e.target.value)}></input>
                <input type="submit" Value="submit"/>
                </form>
            </div>
            {informations ?informations.map((info, idx) => <div className="userInfo" key={info._id}>
   {<Post username={info.user.username} content={info.content} tags={info.discussion_tags}
            create={info.createdAt} commentChildren={info.comments}
            usersWhoLiked={info.users_who_liked}
            currentUser={props.currentUser} 
            user={info.user}
            postId={info._id}
            setPostHasBeenDeleted={setPostHasBeenDeleted}
            postHasBeenDeleted={postHasBeenDeleted}
            
            
    />}</div>
    ) : "loading"} 

        </div>
        <div className="timeInNewsfeed">
            <div>
                    <h1 id="discussion">#Discussion</h1>
                <ul>
                    <li><a href="">Awareness</a></li>
                    <li><a href="">Living with Disabilities</a></li>
                    <li><a href="">Wheelchair Access</a></li>
                    <li><a href="">Kids with Special Needs</a></li>
                    <li><a href="">Family of PTSD</a></li>
                    <li><a href="">Family of Cystic Fibrosis</a></li>
                    <li><a href="">Inclusion and Acceptance</a></li>
                    <li><a href="">Special Needs Hacks</a></li>
                    <li><a href="">Med Resources</a></li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default Newsfeed
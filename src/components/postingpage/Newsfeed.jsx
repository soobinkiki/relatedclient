import axios from 'axios'
// import jwt_decode from 'jwt-decode'
import { useState, useEffect } from 'react'
import Post from './Post.jsx'

const Newsfeed = (props) => {

    // 20 objects
    const [informations, setInformations] = useState([])

    const [postText, setPostText] = useState("")
    const [postTitle, setPostTitle] = useState("")
    const [contentModifiedCounter, setPostCounter] = useState(0)

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
                console.log(datas);

            } catch (error) {
                console.log(error);
            }
        }
        userInfo()
    }, [])//, postCounter])
    
//    const postArray = informations ? 
return (
    <div className="newsfeed-container">
        <div></div>
        <div className="navInNewsfeed">
            <h1>&#10224; Home</h1>
            <h1>&#9998; Local News</h1>
            <h1>&#128198; Events</h1>
        </div>
        <div>
            <div>
                {/* <label id="postSubmitLabel">New Post</label> */}
                <form onSubmit={submitAPost}>

                <input id="postInput" placeholder="Post a message here" onChange={ e => setPostText(e.target.value)}></input>
                <input type="submit" Value="submit"/>
                </form>
            </div>
            {informations ?informations.map((info, idx) => <div className="userInfo" key={idx}>
   {<Post username={info.user.username} content={info.content} tags={info.discussion_tags}
            create={info.createdAt} commentChildren={info.comments}
            usersWhoLiked={info.users_who_liked}
            currentUser={props.currentUser} 
            user={info.user}
            postId={info._id}
            
            
    />}</div>
    ) : "loading"} 

        </div>
        <div className="timeInNewsfeed">
            <div>
                <h3>San Francisco, United States</h3> 
                <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=America%2FLos_Angeles" width="100%" height="105" frameborder="0" seamless></iframe> 
            </div>
            <div className="timeTexas">
                <h3>Texas City, United States</h3>
                <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=America%2FChicago" width="100%" height="105" frameborder="0" seamless></iframe> 
            </div>
            <div>
                <h3>New York City, United States</h3>
                <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=America%2FNew_York" width="100%" height="105" frameborder="0" seamless></iframe>
            </div>
        </div>
    </div>
    )
}

export default Newsfeed



    
    // if(!props.currentUser) return <Redirect to='/login' component={ Login } />


    // const datas = [
    //     {username: 'Justin Park', email: 'justin@gmail.com', comment: "this is awesome", image: <img id="postingImg" src={image1}></img>},
    //     {username: 'Henry McDonald', email: 'henry1@gmail.com', comment: "what is this?", image: <img id="postingImg" src={image2}></img>},
    //     {username: 'David Lashinsky', email: 'david@gmail.com', comment: "hey let's meet up", image: <img id="postingImg" src={image3}></img>},
    //     {username: 'Henry Hong', email: 'henry2@gmail.com', comment: "please give me a call", image: <img id="postingImg" src={image4}></img>},
    //     {username: 'Weston Bailey', email: 'weston@gmail.com', comment: "I know what it is", image: <img id="postingImg" src={image5}></img>},
    //     {username: 'Colin Jaffe', email: 'colin@gmail.com', comment: "this is great information", image: <img id="postingImg" src={image6}></img>},
    // ]

    // const userInfo = datas.map((data, index) => {
    //     return (
    //         <div className="userInfo">
    //                 <Post key={index}
    //                         username={data.username}
    //                         email={data.email}
    //                         comment={data.comment}
    //                         image={data.image}
    //                 />
    //         </div>
    //     )  
    // })
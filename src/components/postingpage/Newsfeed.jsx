// import axios from 'axios'
import Post from './Post.jsx'
import image1 from '../../images/temp1.jpeg'
import image2 from '../../images/temp2.jpeg'
import image3 from '../../images/temp3.jpeg'
import image4 from '../../images/temp4.jpeg'
import image5 from '../../images/temp5.jpeg'
import image6 from '../../images/temp6.jpeg'

const Newsfeed = () => {

    
    // const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/???????????????????????`)
    // const userInfo = response.data
    // console.log(userInfo);

    const datas = [
        {username: 'Justin Park', email: 'justin@gmail.com', comment: "this is awesome", image: <img id="postingImg" src={image1}></img>},
        {username: 'Henry McDonald', email: 'henry1@gmail.com', comment: "what is this?", image: <img id="postingImg" src={image2}></img>},
        {username: 'David Lashinsky', email: 'david@gmail.com', comment: "hey let's meet up", image: <img id="postingImg" src={image3}></img>},
        {username: 'Henry Hong', email: 'henry2@gmail.com', comment: "please give me a call", image: <img id="postingImg" src={image4}></img>},
        {username: 'Weston Bailey', email: 'weston@gmail.com', comment: "I know what it is", image: <img id="postingImg" src={image5}></img>},
        {username: 'Collin Jaffe', email: 'collin@gmail.com', comment: "this is great information", image: <img id="postingImg" src={image6}></img>},
    ]

    const userInfo = datas.map((data, index) => {
        return (
            <div className="userInfo">
                    <Post key={index}
                            username={data.username}
                            email={data.email}
                            comment={data.comment}
                            image={data.image}
                    />
            </div>
        )  
    })

return (
        <div className="newsfeed-container">
            <div></div>
            <div className="navInNewsfeed">
                <h1>&#10224; Home</h1>
                <h1>&#9998; Local News</h1>
                <h1>&#128198; Events</h1>
            </div>
            
            <div>
                {/* <input type="text" placeholder="Search"></input>
                <h1>CENTER</h1> */}
                {userInfo}
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
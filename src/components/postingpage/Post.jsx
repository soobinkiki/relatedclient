const Post = (props) => {


    // const temp = props.tags.forEach(tag => <div>#{tag}</div>)

    
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
                <hr id="hr"/>

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

          

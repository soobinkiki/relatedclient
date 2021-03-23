

const Post = (props) => {
    return (
        <div>
            <div>
                {props.image}
                <p id="userComment">{props.comment}</p>
            </div>
            <div>
                <p>{props.username} <input id="commentInputArea" type="text" placeholder="Write your comment here"></input></p>
            </div>
        </div>
    )

}

export default Post
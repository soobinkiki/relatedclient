const Comment = (props) => {

    return (
        <div>
            <p>{props.username}</p>
            <p> {props.create.split("T")[0]}</p>
            <p>{props.content}</p>
        </div>
    )
}

export default Comment
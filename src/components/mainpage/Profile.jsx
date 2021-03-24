

const Profile = (props) => {
    return (

            <div className="profile-container">
                <div className="welcomeRelated">
                    <h1>Welcome to RelateD</h1>
                </div>

                <div className="userAndEmail">
                    <div>
                        <h1>username: </h1>
                        <h1>email: </h1>
                    </div>
                    <div>
                        <h1>{props.currentUser.username}</h1>
                        <h1>{props.currentUser.email}</h1>
                    </div>
                    <form>
                        <label htmlFor="username"></label>
                        <input id="username"
                            type="text"
                            placeholder="Enter username"
                        ></input>            
                        <input type="Submit" value="Change"></input>
                    </form>
                </div>
            </div>
    )
}

export default Profile
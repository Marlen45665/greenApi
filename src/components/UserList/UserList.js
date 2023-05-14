import User from "./User/User";
import "./UserList.css"

const UserList = ({ users }) => {

const d = () => {
  console.log("g")
}

  const renderedUsers = users.map((user) => (
    <User key={user.id} user={user} onClick={d}/>
  ));

  return <div className="user-list">{renderedUsers}</div>;
};

export default UserList;
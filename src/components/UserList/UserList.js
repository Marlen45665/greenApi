import User from "./User/User";
import "./UserList.css"

const UserList = ({ users, onUserClick }) => {
  const renderedUsers = users.map((user) => (
    <User key={user.id} user={user} onUserClick={onUserClick}/>
  ));
  return <div className="user-list">{renderedUsers}</div>;
};

export default UserList;
import "./User.css"


function User ({ user, onUserClick }) {
  return( 
      <div className="user"  id={user.id} onClick={() => onUserClick(user.id)}>
        <div className="user-name">{user.name}</div>
        <div className={user.newMessage ? "newmessage": "no-newmessage"}></div>
      </div>
  )
};

export default User;
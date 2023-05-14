import "./User.css"



function User ({ user }) {



  return( 
      <div className="user"  id={user.id}>
        <div className="user-name">{user.name}</div>
      </div>
  )
};

export default User;
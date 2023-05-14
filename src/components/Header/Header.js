import "./Header.css"


const Header = ({ title, children }) => (
  <div className="header">
    <h2>{title}</h2>
    {children}
  </div>
);
  
export default Header;
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className='top-bar'>
      <NavLink className='home-logo-link' to='/'>
        <div className='logo-and-name'>
          <img className='logo'src='https://thermos-project-bucket.s3.us-east-2.amazonaws.com/thermos-linear-icon-thin-line-illustration-hot-drink-contour-symbol-isolated-outline-drawing-vector.jpg' alt='Thermos logo'/>
          <h1 className='name'>Thermos</h1>
        </div>
      </NavLink>
      <div className='profile-button-container'>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;

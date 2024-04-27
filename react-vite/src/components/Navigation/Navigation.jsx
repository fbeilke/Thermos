import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { IoText, IoCamera, IoVideocam, IoVolumeMedium } from "react-icons/io5";
import { useModal } from "../../context/Modal";
import CreateTextPostModal from "../CreatePost/CreateTextPostModal";
import CreatePhotoPostModal from "../CreatePost/CreatePhotoPostModal";
import CreateVideoPostModal from "../CreatePost/CreateVideoPostModal";
import "./Navigation.css";

function Navigation() {
  const { user } = useSelector(state => state.session)
  const { setModalContent } = useModal();

  return (
    <div className='top-bar'>
      <NavLink className='home-logo-link' to='/'>
        <div className='logo-and-name'>
          <img className='logo'src='https://thermos-project-bucket.s3.us-east-2.amazonaws.com/thermos-linear-icon-thin-line-illustration-hot-drink-contour-symbol-isolated-outline-drawing-vector.jpg' alt='Thermos logo'/>
          <h1 className='name'>Thermos</h1>
        </div>
      </NavLink>
      {!user ? null :
        <div className='create-post-buttons-container'>
          <p className='create-post-label'>Create Post: </p>
          <div className='create-post-buttons' onClick={() => setModalContent(<CreateTextPostModal />)}>
            <p className='create-post-icons'>{<IoText />}</p>
            <p className='create-post-buttons-text'>Text</p>
          </div>
          <div className='create-post-buttons' onClick={() => setModalContent(<CreatePhotoPostModal />)}>
            <p className='create-post-icons'>{<IoCamera />}</p>
            <p className='create-post-buttons-text'>Photo</p>
          </div>
          <div className='create-post-buttons' onClick={() => setModalContent(<CreateVideoPostModal />)}>
            <p className='create-post-icons'>{<IoVideocam />}</p>
            <p className='create-post-buttons-text'>Video</p>
          </div>
          <div className='create-post-buttons' onClick={() => setModalContent()}>
            <p className='create-post-icons'>{<IoVolumeMedium />}</p>
            <p className='create-post-buttons-text'>Audio</p>
          </div>
        </div>
      }
      <div className='profile-button-container'>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;

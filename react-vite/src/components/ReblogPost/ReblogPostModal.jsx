import { useDispatch } from 'react-redux';
import { IoText, IoCamera, IoVideocam, IoVolumeMedium } from "react-icons/io5";
import { useModal } from "../../context/Modal";
import CreateTextPostModal from "../CreatePost/CreateTextPostModal";
import CreatePhotoPostModal from "../CreatePost/CreatePhotoPostModal";
import CreateVideoPostModal from "../CreatePost/CreateVideoPostModal";
import CreateAudioPostModal from "../CreatePost/CreateAudioPostModal";
import { reblogAsIsThunk } from '../../redux/reblogs';
import './ReblogPost.css';

export default function ReblogPostModal({ post }) {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    function handleAsIsReblog() {
        dispatch(reblogAsIsThunk(post))
    }

    return (
        <div className='reblog-post-modal'>
            <button className='reblog-post-as-is' onClick={handleAsIsReblog}>Reblog post as is</button>
            <p>or</p>
            <div className='create-post-buttons-container-in-reblog-modal'>
            <p className='create-post-label'>Add your own content:</p>
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
            <div className='create-post-buttons' onClick={() => setModalContent(<CreateAudioPostModal />)}>
                <p className='create-post-icons'>{<IoVolumeMedium />}</p>
                <p className='create-post-buttons-text'>Audio</p>
            </div>
      </div>

        </div>
    )
}

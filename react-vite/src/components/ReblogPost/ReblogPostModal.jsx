import { useDispatch } from 'react-redux';
import { IoText, IoCamera, IoVideocam, IoVolumeMedium } from "react-icons/io5";
import { useModal } from "../../context/Modal";
import { reblogAsIsThunk } from '../../redux/reblogs';
import './ReblogPost.css';
import CreateTextReblog from './CreateTextReblog';
import CreatePhotoReblog from './CreatePhotoReblog';
import CreateVideoReblog from './CreateVideoReblog';
import CreateAudioReblog from './CreateAudioReblog';

export default function ReblogPostModal({ post }) {
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();

    async function handleAsIsReblog(e) {
        e.preventDefault();

       const response = await dispatch(reblogAsIsThunk(post));

       if (response) {
            alert("There was an error")
       } else {
            closeModal();
       }

    }

    return (
        <div className='reblog-post-modal'>
            <button className='reblog-post-as-is' onClick={handleAsIsReblog}>Reblog post as is</button>
            <p>or</p>
            <div className='create-post-buttons-container-in-reblog-modal'>
            <p className='create-post-label'>Add your own content:</p>
            <div className='create-post-buttons' onClick={() => setModalContent(<CreateTextReblog post={post} />)}>
                <p className='create-post-icons'>{<IoText />}</p>
                <p className='create-post-buttons-text'>Text</p>
            </div>
            <div className='create-post-buttons' onClick={() => setModalContent(<CreatePhotoReblog post={post} />)}>
                <p className='create-post-icons'>{<IoCamera />}</p>
                <p className='create-post-buttons-text'>Photo</p>
            </div>
            <div className='create-post-buttons' onClick={() => setModalContent(<CreateVideoReblog post={post} />)}>
                <p className='create-post-icons'>{<IoVideocam />}</p>
                <p className='create-post-buttons-text'>Video</p>
            </div>
            <div className='create-post-buttons' onClick={() => setModalContent(<CreateAudioReblog post={post} />)}>
                <p className='create-post-icons'>{<IoVolumeMedium />}</p>
                <p className='create-post-buttons-text'>Audio</p>
            </div>
      </div>

        </div>
    )
}

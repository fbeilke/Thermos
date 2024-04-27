import { IoText, IoCamera, IoVideocam, IoVolumeMedium } from "react-icons/io5";
import { useModal } from "../../context/Modal";
import CreateTextPostModal from "./CreateTextPostModal";
import CreatePhotoPostModal from "./CreatePhotoPostModal";
import './CreateAnyPost.css'

export default function CreateAnyPostModal() {
    const { setModalContent } = useModal();

    return (
        <div className='create-post-buttons-container-in-modal'>
            <p className='create-post-label'>Create Post: </p>
            <div className='create-post-buttons' onClick={() => setModalContent(<CreateTextPostModal />)}>
                <p className='create-post-icons'>{<IoText />}</p>
                <p className='create-post-buttons-text'>Text</p>
            </div>
            <div className='create-post-buttons' onClick={() => setModalContent(<CreatePhotoPostModal />)}>
                <p className='create-post-icons'>{<IoCamera />}</p>
                <p className='create-post-buttons-text'>Photo</p>
            </div>
            <div className='create-post-buttons' onClick={() => setModalContent()}>
                <p className='create-post-icons'>{<IoVideocam />}</p>
                <p className='create-post-buttons-text'>Video</p>
            </div>
            <div className='create-post-buttons' onClick={() => setModalContent()}>
                <p className='create-post-icons'>{<IoVolumeMedium />}</p>
                <p className='create-post-buttons-text'>Audio</p>
            </div>
      </div>
    )
}

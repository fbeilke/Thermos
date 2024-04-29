import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deletePostThunk } from "../../redux/posts";
import './DeletePost.css';

export default function DeletePostModal({postId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    async function handleDelete(e) {
        e.preventDefault();

        const response = await dispatch(deletePostThunk(postId))

        if (response) {
            return response
        } else {
            closeModal()
        }

    }

    return (
        <div className='delete-post-modal'>
            <h1>Are you sure you want to delete this post?</h1>
            <div className='delete-post-buttons'>
                <button className='delete-button' onClick={handleDelete}>Yes, delete</button>
                <button className='no-delete-button' onClick={closeModal}>No, go back</button>
            </div>
        </div>
    )
}

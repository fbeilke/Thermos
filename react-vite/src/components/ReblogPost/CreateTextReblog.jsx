import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createPostThunk } from '../../redux/posts'
import Post from '../Post/Post';
import './CreateTextReblog.css';

export default function CreateTextReblog({ post }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!content.length) setErrors({content: "Content is required for this type of post"})

        if (Object.keys(errors).length === 0) {
            const new_post = {
                content,
                post_type: "text",
                previous_post_id: post.id
            }

            const response = await dispatch(createPostThunk(new_post))

            if (response) {
                setErrors(response);
            } else {
                closeModal();
            }
        }
    }


    return (
        <div className="create-text-reblog">
            <Post actualPost={post} />
            <form onSubmit={handleSubmit} className="create-text-reblog-input-containers">
                <label>Add a text comment</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='create-text-reblog-input-textarea'
                />
                <div className='create-text-reblog-error-container'>
                    {errors.content && <p className='errors'>{errors.content}</p>}
                </div>
                <div className='button-container'>
                    <button className='create-text-reblog-button' type='submit'>Reblog post</button>
                </div>
            </form>
        </div>
    )

}

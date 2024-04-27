import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createPostThunk } from '../../redux/posts'
import './CreateTextPost.css'

export default function CreateTextPostModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    async function handleSubmit(e) {
        e.preventDefault();

        const validators = {};
        if (title.length > 255) validators.title = "Title cannot be over 255 characters"
        if (!content.length) validators.content = "Content is required to make a new post"

        if (Object.keys(validators).length === 0) {
            const new_post = {
                title,
                content,
                post_type: "text"
            }

            const response = await dispatch(createPostThunk(new_post))

            if (response) {
                setErrors(response);
            } else {
                closeModal();
            }
        } else {
            setErrors(validators)
        }
    }

    return (
        <div className='create-text-post-modal'>
            <h1 className='create-text-post-label'>Create a new text post</h1>
            <form onSubmit={handleSubmit} className='create-text-post-form'>
                <div className='create-text-input-containers'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='create-text-inputs'
                    />
                    <div className="floating-placeholders" style={ title ? { top: "-18px" } : null }>
                        <label>Post Title (optional)</label>
                    </div>
                    <div className='create-text-error-container'>
                        {errors.title && <p className='errors'>{errors.title}</p>}
                    </div>
                </div>
                <div className='create-text-input-containers'>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='create-text-input-textarea'
                    />
                    <div className="floating-placeholders" style={ content ? { top: "-18px" } : null }>
                        <label>Post Content</label>
                    </div>
                    <div className='create-text-error-container'>
                        {errors.content && <p className='errors'>{errors.content}</p>}
                    </div>
                </div>
                <button className='create-text-post-button' type='submit'>Create post</button>
            </form>
        </div>
    )
}

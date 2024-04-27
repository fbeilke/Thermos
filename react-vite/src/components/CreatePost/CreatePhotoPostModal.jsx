import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPostThunk, saveFileThunk, removeFileThunk } from "../../redux/posts";
import './CreatePhotoPost.css'

export default function CreatePhotoPostModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [upload, setUpload] = useState(false);
    const [link, setLink] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileAccepted, setFileAccepted] = useState(false);
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
                caption,
                post_type: "photo"
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

    function chooseUpload(e) {
        e.preventDefault();
        setUpload(true)
        setLink(false)
    }

    function chooseLink(e) {
        e.preventDefault();
        setUpload(false)
        setLink(true)
    }

    async function fileSubmit(file) {

        const formData = new FormData();

        formData.append("file", file);

        setIsLoading(true)

        const response = await dispatch(saveFileThunk(formData))

        if (response.url) {
            setIsLoading(false)
            setFileAccepted(true)
            setContent(response.url)
        } else {
            setErrors(response)
            setIsLoading(false)
        }

    }

    async function removeFile() {

       const response = await dispatch(removeFileThunk(content))

        if (response) {
            setErrors(response)
        } else {
            setFileAccepted(false)
            setContent('')
        }
    }


    return (
        <div className='create-photo-post-modal'>
            <h1 className='create-photo-post-label'>Create a new photo post</h1>
            <form onSubmit={handleSubmit} className='create-photo-post-form'>
                <div className='create-photo-input-containers'>
                    <input
                        type='photo'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='create-photo-inputs'
                    />
                    <div className="floating-placeholders" style={ title ? { top: "-18px" } : null }>
                        <label>Post Title (optional)</label>
                    </div>
                    <div className='create-photo-error-container'>
                        {errors.title && <p className='errors'>{errors.title}</p>}
                    </div>
                </div>
                <div className='create-photo-content-buttons'>
                    {fileAccepted ? <img src={content} alt="Image not loading" className='post-photo-preview-image' /> :
                        <div className='choose-photo-buttons'>
                            <button className='create-photo-file-button' onClick={chooseUpload}>
                                Upload a photo
                            </button>
                            <button className='create-photo-link-button' onClick={chooseLink}>
                                Link from online
                            </button>
                        </div>
                    }
                    {!link || fileAccepted ? null :
                        <div className='create-photo-input-containers'>
                            <input
                                type='text'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className='create-photo-inputs'
                            />
                            <div className="floating-placeholders" style={ content ? { top: "-18px" } : null }>
                                <label>Photo Link</label>
                            </div>
                        </div>
                    }
                    {!upload || fileAccepted  ? null :
                        <input
                            type='file'
                            accept="image/*"
                            onChange={(e) => fileSubmit(e.target.files[0])}
                            className='create-photo-file-input'
                        />
                    }
                    <div className='photo-loading-or-file-accepted-container'>
                        {!isLoading ? null : <p>Loading...</p>}
                        {!fileAccepted ? null :
                        <div>
                            <span>File accepted!</span>
                            <span onClick={removeFile} className='remove-file-link'>Remove?</span>
                        </div>
                        }
                    </div>
                    <div className='create-photo-error-container'>
                        {errors.content && <p className='errors'>{errors.content}</p>}
                    </div>
                </div>
                <div className='create-photo-input-containers'>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className='create-photo-input-textarea'
                    />
                    <div className="floating-placeholders" style={ caption ? { top: "-18px" } : null }>
                        <label>Photo Caption (optional)</label>
                    </div>
                </div>
                <button className='create-photo-post-button' type='submit'>Create post</button>
            </form>
        </div>
    )

}

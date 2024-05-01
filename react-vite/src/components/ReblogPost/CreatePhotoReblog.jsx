import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPostThunk, saveFileThunk, removeFileThunk } from "../../redux/posts";
import Post from '../Post/Post';
import './CreatePhotoReblog.css'

export default function CreatePhotoReblog({ post }) {
    const dispatch = useDispatch();
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

        if (!content.length) setErrors({content: "Content is required for this type of post"})

        if (Object.keys(errors).length === 0) {
            const new_post = {
                content,
                caption,
                post_type: "photo",
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
        <div className="create-photo-reblog">
            <Post actualPost={post} />
            <form onSubmit={handleSubmit} className='create-photo-reblog-post-form'>
                <div className='create-photo-reblog-content-buttons'>
                    {fileAccepted ? <img src={content} alt="Image not loading" className='post-photo-preview-image' /> :
                        <div className='choose-photo-buttons'>
                            <button className='create-photo-reblog-file-button' onClick={chooseUpload}>
                                Upload a photo
                            </button>
                            <button className='create-photo-reblog-link-button' onClick={chooseLink}>
                                Link from online
                            </button>
                        </div>
                    }
                    {!link || fileAccepted ? null :
                        <div className='create-photo-reblog-input-containers'>
                            <label>Add link</label>
                            <input
                                type='text'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className='create-photo-reblog-inputs'
                            />
                        </div>
                    }
                    {!upload || fileAccepted  ? null :
                        <input
                            type='file'
                            accept="image/*"
                            onChange={(e) => fileSubmit(e.target.files[0])}
                            className='create-photo-reblog-file-input'
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
                    <div className='create-photo-reblog-error-container'>
                        {errors.content && <p className='errors'>{errors.content}</p>}
                    </div>
                </div>
                <div className='create-photo-reblog-input-containers'>
                    <label className='create-photo-reblog-caption-label'>Add a caption</label>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className='create-photo-reblog-input-textarea'
                    />
                </div>
                <div className='button-container'>
                    <button className='create-photo-reblog-button' type='submit'>Reblog post</button>
                </div>
            </form>
        </div>
    )
}

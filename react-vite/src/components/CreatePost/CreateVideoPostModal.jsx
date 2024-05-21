import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPostThunk, saveFileThunk, removeFileThunk } from "../../redux/posts";
import ReactPlayer from 'react-player';
import './CreateVideoPost.css'

export default function CreateVideoPostModal() {
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
        if (content && !content.startsWith('http://') && !content.startsWith('https://')) validators.content = "Video url must begin with http:// or https://"



        if (Object.keys(validators).length === 0) {
            const new_post = {
                title,
                content,
                caption,
                post_type: "video"
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
        <div className='create-video-post-modal'>
            <h1 className='create-video-post-label'>Create a new video post</h1>
            <form onSubmit={handleSubmit} className='create-video-post-form'>
                <div className='create-video-input-containers'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='create-video-inputs'
                    />
                    <div className="floating-placeholders" style={ title ? { top: "-18px" } : null }>
                        <label>Post Title (optional)</label>
                    </div>
                    <div className='create-video-error-container'>
                        {errors.title && <p className='errors'>{errors.title}</p>}
                    </div>
                </div>
                <div className='create-video-content-buttons'>
                    {fileAccepted ? <ReactPlayer url={content} controls={true} height={200} width='100%' style={{backgroundColor: 'black'}} className='post-video-preview' /> :
                        <div className='choose-video-buttons'>
                            <button className='create-video-file-button' onClick={chooseUpload}>
                                Upload a video
                            </button>
                            <button className='create-video-link-button' onClick={chooseLink}>
                                Link from online
                            </button>
                        </div>
                    }
                    {!link || fileAccepted ? null :
                        <div className='create-video-input-containers'>
                            <input
                                type='text'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className='create-video-inputs'
                            />
                            <div className="floating-placeholders" style={ content ? { top: "-18px" } : null }>
                                <label>Video Link</label>
                            </div>
                        </div>
                    }
                    {!upload || fileAccepted  ? null :
                        <input
                            type='file'
                            accept="video/mp4, video/*"
                            onChange={(e) => fileSubmit(e.target.files[0])}
                            className='create-video-file-input'
                        />
                    }
                    <div className='video-loading-or-file-accepted-container'>
                        {!isLoading ? null : <p>Loading...</p>}
                        {!fileAccepted ? null :
                        <div>
                            <span>File accepted!</span>
                            <span onClick={removeFile} className='remove-file-link'>Remove?</span>
                        </div>
                        }
                    </div>
                    <div className='create-video-error-container'>
                        {errors.content && <p className='errors'>{errors.content}</p>}
                    </div>
                </div>
                <div className='create-video-input-containers'>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className='create-video-input-textarea'
                    />
                    <div className="floating-placeholders" style={ caption ? { top: "-18px" } : null }>
                        <label>Video Caption (optional)</label>
                    </div>
                </div>
                <button className='create-video-post-button' type='submit'>Create post</button>
            </form>
        </div>
    )

}

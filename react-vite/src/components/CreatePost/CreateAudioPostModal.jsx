import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPostThunk, saveFileThunk, removeFileThunk } from "../../redux/posts";
import './CreateAudioPost.css'

export default function CreateAudioPostModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [upload, setUpload] = useState(false);
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
                post_type: "audio"
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
        <div className='create-audio-post-modal'>
            <h1 className='create-audio-post-label'>Create a new audio post</h1>
            <form onSubmit={handleSubmit} className='create-audio-post-form'>
                <div className='create-audio-input-containers'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='create-audio-inputs'
                    />
                    <div className="floating-placeholders" style={ title ? { top: "-18px" } : null }>
                        <label>Post Title (optional)</label>
                    </div>
                    <div className='create-audio-error-container'>
                        {errors.title && <p className='errors'>{errors.title}</p>}
                    </div>
                </div>
                <div className='create-audio-content-buttons'>
                    {fileAccepted ? <audio src={content} controls={true} className='post-audio-preview'>Your browser does not support the audio player</audio>:
                        <div className='choose-audio-buttons'>
                            <button className='create-audio-file-button' onClick={chooseUpload}>
                                Upload an audio
                            </button>
                        </div>
                    }
                    {!upload || fileAccepted  ? null :
                        <input
                            type='file'
                            accept="audio/mp3, audio/mp4"
                            onChange={(e) => fileSubmit(e.target.files[0])}
                            className='create-audio-file-input'
                        />
                    }
                    <div className='audio-loading-or-file-accepted-container'>
                        {!isLoading ? null : <p>Loading...</p>}
                        {!fileAccepted ? null :
                        <div>
                            <span>File accepted!</span>
                            <span onClick={removeFile} className='remove-file-link'>Remove?</span>
                        </div>
                        }
                    </div>
                    <div className='create-audio-error-container'>
                        {errors.content && <p className='errors'>{errors.content}</p>}
                    </div>
                </div>
                <div className='create-audio-input-containers'>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className='create-audio-input-textarea'
                    />
                    <div className="floating-placeholders" style={ caption ? { top: "-18px" } : null }>
                        <label>Audio Caption (optional)</label>
                    </div>
                </div>
                <button className='create-audio-post-button' type='submit'>Create post</button>
            </form>
        </div>
    )

}

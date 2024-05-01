import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPostThunk, saveFileThunk, removeFileThunk } from "../../redux/posts";
import Post from '../Post/Post';
import './CreateAudioReblog.css'

export default function CreateAudioReblog({ post }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [upload, setUpload] = useState(false);
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
                post_type: "audio",
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
        <div className='create-audio-reblog'>
            <Post actualPost={post} />
            <form onSubmit={handleSubmit} className='create-audio-reblog-post-form'>
            <div className='create-audio-reblog-content-buttons'>
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
                            className='create-audio-reblog-file-input'
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
                    <div className='create-audio-reblog-error-container'>
                        {errors.content && <p className='errors'>{errors.content}</p>}
                    </div>
                </div>
                <div className='create-audio-reblog-input-containers'>
                    <label>Add a caption</label>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className='create-audio-reblog-input-textarea'
                    />
                </div>
                <div className='button-container'>
                    <button className='create-audio-reblog-button' type='submit'>Reblog post</button>
                </div>
            </form>
        </div>
    )
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPostThunk, saveFileThunk, removeFileThunk } from "../../redux/posts";
import ReactPlayer from 'react-player'
import Post from '../Post/Post';
import './CreateVideoReblog.css'

export default function CreateVideoReblog({ post }) {
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
                post_type: "video",
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
        <div className='create-video-reblog'>
            <Post actualPost={post} />
            <form onSubmit={handleSubmit} className='create-video-reblog-post-form'>
            <div className='create-video-reblog-content-buttons'>
                    {fileAccepted ? <ReactPlayer url={content} controls={true} height={200} width={500} style={{backgroundColor: 'black'}} className='post-video-preview' /> :
                        <div className='choose-video-buttons'>
                            <button className='create-video-reblog-file-button' onClick={chooseUpload}>
                                Upload a video
                            </button>
                            <button className='create-video-reblog-link-button' onClick={chooseLink}>
                                Link from online
                            </button>
                        </div>
                    }
                    {!link || fileAccepted ? null :
                        <div className='create-video-reblog-input-containers'>
                            <label>Add link</label>
                            <input
                                type='text'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className='create-video-reblog-inputs'
                            />
                        </div>
                    }
                    {!upload || fileAccepted  ? null :
                        <input
                            type='file'
                            accept="video/mp4, video/*"
                            onChange={(e) => fileSubmit(e.target.files[0])}
                            className='create-video-reblog-file-input'
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
                    <div className='create-video-reblog-error-container'>
                        {errors.content && <p className='errors'>{errors.content}</p>}
                    </div>
                </div>
                <div className='create-video-reblog-input-containers'>
                    <label>Add a caption</label>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className='create-video-reblog-input-textarea'
                    />
                </div>
                <div className='button-container'>
                    <button className='create-video-reblog-button' type='submit'>Reblog post</button>
                </div>
            </form>
        </div>
    )
}

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveFileThunk, removeFileThunk, updatePostThunk } from '../../redux/posts';
import { useModal } from '../../context/Modal';
import ReactPlayer from 'react-player';
import './EditPost.css';


export default function EditPostModal ({ post }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [caption, setCaption] = useState("");
    const [errors, setErrors] = useState({});
    const [upload, setUpload] = useState(false);
    const [link, setLink] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileAccepted, setFileAccepted] = useState(false);
    const { closeModal } = useModal();


    useEffect(() => {
        if(post) {
            setTitle(post.title);
            setContent(post.content);
            setCaption(post.caption);
            if(post.postType !== 'text') {
                setFileAccepted(true)
            }
        }
    }, [post])


    async function handleSubmit(e) {
        e.preventDefault();

        const validators = {};
        if (title && title.length > 255) validators.title = "Title cannot be over 255 characters"
        if (!content.length) validators.content = "Content is required to make a new post"

        if (Object.keys(validators).length === 0) {
            const updated_post = {
                id: post.id,
                title,
                content,
                caption,
                post_type: post.postType,
                previous_post_id: post.previousPostId
            }

            const response = await dispatch(updatePostThunk(updated_post))

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

        if (content.includes('thermos-project-bucket')) {
            const response = await dispatch(removeFileThunk(content))

             if (response) {
                 setErrors(response)
             } else {
                 setFileAccepted(false)
                 setContent('')
             }
        } else {
            setFileAccepted(false)
            setContent('')
        }
    }

    return (
        <div className='edit-post-modal'>
            <h1 className='edit-post-label'>Edit post</h1>
            <form onSubmit={handleSubmit} className='edit-post-form'>
                {post.previousPostId ? null :
                    <div className='edit-post-input-containers'>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='edit-post-inputs'
                        />
                        <div className="floating-placeholders" style={ title ? { top: "-18px" } : null }>
                            <label>Post Title (optional)</label>
                        </div>
                        <div className='edit-post-error-container'>
                            {errors.title && <p className='errors'>{errors.title}</p>}
                        </div>
                    </div>
                }
                <div className='edit-content-preview'>
                    {post.postType !== 'text' ? null :
                    <div className='edit-text-content'>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='edit-post-textarea'
                        />
                        <div className="floating-placeholders" style= { content ? { top: "-18px" } : null }>
                            <label>Post content</label>
                        </div>
                    </div>
                    }
                    {post.postType === 'photo' && fileAccepted ?
                        <div className='edit-photo-content'>
                            <img className='edit-photo-preview' src={content} alt="Image not loading" />
                        </div>
                    : null }
                    {post.postType === 'video' && fileAccepted ?
                        <div className='edit-video-content'>
                            <ReactPlayer url={content} controls={true} height={200} width={500} style={{backgroundColor: 'black'}} className='edit-video-preview' />
                        </div>
                    : null }
                    {post.postType === 'audio' && fileAccepted ?
                        <div className='edit-audio-content'>
                            <audio src={content} controls={true} className='edit-audio-preview'>Your browser does not support the audio player</audio>
                        </div>
                    : null }
                    {!isLoading ? null : <p>Loading...</p> }
                    {fileAccepted && post.postType !== 'text' ?
                        <div className='edit-post-file-accepted-container'>
                            <span>File accepted!</span>
                            <span onClick={removeFile} className='remove-file-link'>Remove?</span>
                        </div>
                    : null }
                    {!fileAccepted && post.postType !== 'text' ?
                        <div className='choose-file-buttons'>
                            <button className='edit-upload-file-button' onClick={chooseUpload}>
                                Upload a file
                            </button>
                            <button className='edit-link-button' onClick={chooseLink}>
                                Link from online
                            </button>
                        </div>
                    : null }
                    {(!link || fileAccepted) || post.postType === 'text' ? null :
                        <div className='edit-post-input-containers'>
                            <input
                                type='text'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className='edit-post-inputs'
                            />
                            <div className="floating-placeholders" style={ content ? { top: "-18px" } : null }>
                                <label>Link</label>
                            </div>
                        </div>
                    }
                    {(!upload || fileAccepted) || post.postType === 'text'  ? null :
                        <input
                            type='file'
                            accept="image/*, video/*, video/mp4, audio/mp3, audio/mp4"
                            onChange={(e) => fileSubmit(e.target.files[0])}
                            className='create-photo-file-input'
                        />
                    }
                    <div className='edit-post-error-container'>
                        {errors.content && <p className='errors'>{errors.content}</p>}
                    </div>
                </div>

                {post.postType === 'text' ? null :
                    <div className='edit-post-input-containers'>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className='edit-caption-textarea'
                        />
                        <div className="floating-placeholders" style={ caption ? { top: "-18px" } : null }>
                            <label>Caption (optional)</label>
                        </div>
                    </div>
                }
                <button className='edit-post-button' type='submit'>Update post</button>
            </form>
        </div>
    )
}

import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import DeletePostModal from "../DeletePost/DeletePostModal"
import EditPostModal from "../EditPost/EditPostModal";
import './PostsFeed.css';

export default function PostsFeed({ posts, blogName }) {
    const { user } = useSelector(state => state.session)
    const { setModalContent } = useModal();


    if (!posts.length) return null

    async function handleDelete(e, postId) {
        e.preventDefault();

        setModalContent(<DeletePostModal postId={postId} />)

    }

    return (
        <div className='posts-feed-container'>
            {posts.map(post => (
                <div className='each-post' key={post.id}>
                    {blogName && blogName === post.creator ? null :
                        <Link to={`/blogs/${post.creator}`} className='post-profile-picture-container'>
                            <img className='post-profile-picture' src={post.creatorImage} alt={post.creator} />
                        </Link>
                    }
                    <div className='each-post-container'>
                        <p className='post-creator'>{post.creator} posted</p>
                        {post.title && <h3>{post.title}</h3>}
                        <div className='post-content'>
                            {post.postType !== 'text' ? null :
                                <div className='text-post-content'>
                                    <p>{post.content}</p>
                                </div>
                            }
                            {post.postType !== 'photo' ? null :
                                <div className='photo-post-content'>
                                    <img className='post-photo' src={post.content} alt={`${post.id} photo`} />
                                </div>
                            }
                            {post.postType !== 'audio' ? null :
                                <div className='audio-post-content'>
                                    <audio controls={true} src={post.content}>Your browser does not support audio player</audio>
                                </div>
                            }
                            {post.postType !== 'video' ? null :
                                <div className='video-post-content'>
                                    <ReactPlayer url={post.content} controls={true} width={500} style={{backgroundColor: 'black'}}/>
                                </div>
                            }
                        </div>
                        <div className='post-caption'>
                            {post.caption && <p>{post.caption}</p>}
                        </div>
                        {post.userId !== user?.id ? null :
                            <div className='interact-post-buttons'>
                                <button className='post-edit-button' onClick={() => setModalContent(<EditPostModal post={post} />)}><FaEdit /></button>
                                <button className='post-delete-button' onClick={(e) => handleDelete(e, post.id)}><MdDeleteForever /></button>
                            </div>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

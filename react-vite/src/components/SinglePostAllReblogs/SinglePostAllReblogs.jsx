import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import DeletePostModal from "../DeletePost/DeletePostModal"
import EditPostModal from "../EditPost/EditPostModal";
import Post from "../Post/Post";
import './SinglePost.css';
import ReblogPostModal from "../ReblogPost/ReblogPostModal";

export default function SinglePost({ mainPostId, allPosts, user }) {
    const { setModalContent } = useModal();


    if (!allPosts || !mainPostId) return null;

    async function handleDelete(e, postID, reblog) {
        e.preventDefault();

        setModalContent(<DeletePostModal postId={postID} reblog={reblog}/>)

    }



    let currPost = mainPostId
    const allLinkedPosts = [];


    while (currPost) {
        allLinkedPosts.push(currPost)
        if (allPosts[currPost]) {
            currPost = allPosts[currPost].previousPostId
        } else {
            currPost = null;
        }
    }

    if (!allPosts[mainPostId]) return null;

    console.log('============', allPosts[mainPostId])



    return (
        <div className='each-single-post'>
            <div className='post-buttons'>
                {allPosts[mainPostId].userId === user?.id && allPosts[mainPostId].reblogCreator ?
                    <div className='interact-own-post-buttons'>
                        <button className='post-delete-button' onClick={(e) => handleDelete(e, mainPostId, true)}><MdDeleteForever /></button>
                    </div>
                : null }
                {allPosts[mainPostId].userId !== user?.id || allPosts[mainPostId].reblogCreator ? null :
                    <div className='interact-own-post-buttons'>
                        <button className='post-edit-button' onClick={() => setModalContent(<EditPostModal post={allPosts[mainPostId]} />)}><FaEdit /></button>
                        <button className='post-delete-button' onClick={(e) => handleDelete(e, mainPostId, false)}><MdDeleteForever /></button>
                    </div>
                }
                {!user ? null :
                    <div className='interact-post-buttons'>
                        <button className='post-reblog-button' onClick={() => setModalContent(<ReblogPostModal post={allPosts[mainPostId]} />)}>
                            <img src='https://thermos-project-bucket.s3.us-east-2.amazonaws.com/tumblr-reblog-icon.png' className='reblog-button-icon'/>
                        </button>
                    </div>
                }
            </div>
            {allLinkedPosts.map(postID => (
                <Post postId={postID} allPosts={allPosts} key={postID}/>
            ))}

            {allPosts[mainPostId].reblogCreator ?
                <p className='reblogged-label'>
                    <Link className='blog-links' to={`/blogs/${allPosts[mainPostId].reblogCreator}`}>{allPosts[mainPostId].reblogCreator}</Link> reblogged from <Link className='blog-links' to={`/blogs/${allPosts[mainPostId].rebloggedFrom}`}>{allPosts[mainPostId].rebloggedFrom}</Link></p>
            : null }
            {allPosts[mainPostId].previousPostId ?
                <p className='reblogged-label'>
                    <Link className='blog-links' to={`/blogs/${allPosts[mainPostId].creator}`}>{allPosts[mainPostId].creator}</Link> reblogged from <Link className='blog-links' to={`/blogs/${allPosts[allPosts[mainPostId].previousPostId].creator}`}>{allPosts[allPosts[mainPostId].previousPostId].creator}</Link></p>
            : null }
        </div>
    )

}

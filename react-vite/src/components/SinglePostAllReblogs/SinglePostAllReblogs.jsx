import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import DeletePostModal from "../DeletePost/DeletePostModal"
import EditPostModal from "../EditPost/EditPostModal";
import Post from "../Post/Post";
import './SinglePost.css';

export default function SinglePost({ postId, allPosts, user }) {
    const { setModalContent } = useModal();

    if (!allPosts) return null;

    async function handleDelete(e, postID) {
        e.preventDefault();

        setModalContent(<DeletePostModal postId={postID} />)

    }

    let currPost = postId
    const allLinkedPosts = [];


    while (currPost) {
        allLinkedPosts.push(currPost)
        currPost = allPosts[currPost].previousPostId
    }


    return (
        <div className='each-single-post'>
            {postId !== user?.id ? null :
                <div className='interact-post-buttons'>
                    <button className='post-edit-button' onClick={() => setModalContent(<EditPostModal post={allPosts[postId]} />)}><FaEdit /></button>
                    <button className='post-delete-button' onClick={(e) => handleDelete(e, postId)}><MdDeleteForever /></button>
                </div>
            }
            {allLinkedPosts.map(postID => (
                <Post postId={postID} allPosts={allPosts} key={postID}/>
            ))}
        </div>
    )

}

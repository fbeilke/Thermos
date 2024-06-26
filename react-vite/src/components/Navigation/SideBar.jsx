import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';
import './SideBar.css'
import CreateAnyPostModal from '../CreatePost/CreateAnyPostModal';


export default function SideBar() {
    const [accountIsOpen, setAccountIsOpen] = useState(false)
    const [blogIsOpen, setBlogIsOpen] = useState(false)
    const { user } = useSelector(state => state.session)
    const { setModalContent } = useModal();



    return (
        <div className='sidebar-container'>
            <div className='sidebar-links-container'>
                <Link to='/' className='sidebar-links'>Home</Link>
                <Link to='/explore' className='sidebar-links'>Explore</Link>
                {/* <p onClick={() => alert("Feature coming soon!")} className='sidebar-links'>Settings</p> */}
                <Link to='/about' className='sidebar-links'>About</Link>
                <p onClick={!user ? () => setModalContent(<LoginFormModal />) : () => setAccountIsOpen(!accountIsOpen)} className='sidebar-links account-link'>Account {accountIsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>

                {!user || user.message || !accountIsOpen ? null :
                    <div className='sidebar-links-container-2'>
                        <Link to='/likes' className='sidebar-links'>Likes</Link>
                        <Link to='/following' className='sidebar-links'>Following</Link>
                        <p onClick={() => setBlogIsOpen(!blogIsOpen)} className='sidebar-links blog-link'>Blog {blogIsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
                    </div>
                }
                {user && !user.message && accountIsOpen && blogIsOpen ?
                    <div className='sidebar-links-container-3'>
                        <Link to={`/blogs/${user.blogName}`} className='sidebar-links'>View {user.blogName}</Link>
                        <Link to='/followers' className='sidebar-links'>Followers</Link>
                    </div>
                 : null }
                 {!user ? null :
                 <button className='create-post-button' onClick={() => setModalContent(<CreateAnyPostModal />)}>Create New Post</button>
                 }
            </div>
        </div>
    )
}

import { Link } from 'react-router-dom';
import { IoLogoJavascript } from "react-icons/io5";
import { SiFlask, SiPostgresql, SiPython, SiRedux, SiSqlalchemy, SiSqlite } from "react-icons/si";
import { FaCss3Alt, FaGithub, FaReact, FaLinkedin } from "react-icons/fa";
import { TiHtml5 } from "react-icons/ti";
import './AboutPage.css';

export default function AboutPage() {

    return (
        <div className='about-page'>
            <h1 className='about-page-title'>About the site</h1>
            <div className='about-page-content'>
                <p>This is a custom site built by Finn Beilke inspired by the social media site Tumblr.</p>
                <h2>You can find Finn Beilke at:</h2>
                <p><Link to="https://github.com/fbeilke" className='contact-me-links'><FaGithub/> Github</Link></p>
                <p><Link to="https://www.linkedin.com/in/fbeilke/" className='contact-me-links'><FaLinkedin/> LinkedIn</Link></p>
                <div className='about-page-technologies'>
                    <h3>Some technologies used in this project:</h3>
                    <p><IoLogoJavascript/> Javascript</p>
                    <p><SiPython/> Python</p>
                    <p><FaReact/> React</p>
                    <p><SiRedux/> Redux</p>
                    <p><SiFlask/> Flask</p>
                    <p><TiHtml5/> HTML5</p>
                    <p><FaCss3Alt/> CSS3</p>
                    <p><SiPostgresql/> PostgreSQL</p>
                    <p><SiSqlalchemy/> SQLAlchemy</p>
                    <p><SiSqlite/> SQLite3</p>
                    <h3>Site is hosted live on Render</h3>
                </div>
            </div>
        </div>
    )
}

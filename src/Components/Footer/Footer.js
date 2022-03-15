import './Footer.css';
import facebook from '../../Assets/facebook.svg';
import instagram from '../../Assets/instagram.png';
import twitter from '../../Assets/twitter.svg';
import youtube from '../../Assets/youtube.png';
import { Link } from 'react-router-dom';

function Footer(){


    return(
        <footer className='footer'>

        <div className='footer-content-div'>
            <div className='div-socials'>
                <img alt='facebook' src={facebook}/>
                <img alt='instagram' src={instagram}/>
                <img alt='twitter' src={twitter}/>
                <img alt='youtube' src={youtube}/>
            </div>

            <div className='footer-div-about'>
                <h6>About</h6>
                <ul>
                    <li><Link style={{textDecoration: 'none', color: 'white'}} to='#'>FAQ</Link></li>
                    <li><Link style={{textDecoration: 'none', color: 'white'}} to='#'>Terms Of Use</Link></li>
                    <li><Link style={{textDecoration: 'none', color: 'white'}} to='#'>Contact Us</Link></li>
                    <li><Link style={{textDecoration: 'none', color: 'white'}} to='#'>Careers</Link></li>
                </ul>
            </div>
        </div>

        <p className='copy'>&copy;2022 Lorem Ipsum Inc.</p>

        </footer>
    );
}

export default Footer;
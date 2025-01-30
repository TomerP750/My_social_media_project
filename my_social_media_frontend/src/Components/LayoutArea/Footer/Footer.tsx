import "./Footer.css";
import { NavLink } from "react-router-dom";  // Importing NavLink for internal routing
import {Facebook, Twitter, Instagram, LinkedIn, GitHub} from "@mui/icons-material";
import XIcon from '@mui/icons-material/X';
export function Footer(): JSX.Element {
    return (
        <div className="Footer">
            {/* Left side - 4 Rows and 4 Columns */}
            <div className="footer-left">
                <div className="footer-column">
                    <h3>About Us</h3>
                    <ul>
                        <li><NavLink to="/about" className="footer-link">Our Story</NavLink></li>
                        <li><NavLink to="/careers" className="footer-link">Careers</NavLink></li>
                        <li><NavLink to="/contact" className="footer-link">Contact</NavLink></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Services</h3>
                    <ul>
                        <li><NavLink to="/consulting" className="footer-link">Consulting</NavLink></li>
                        <li><NavLink to="/development" className="footer-link">Development</NavLink></li>
                        <li><NavLink to="/design" className="footer-link">Design</NavLink></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li><NavLink to="/faq" className="footer-link">FAQs</NavLink></li>
                        <li><NavLink to="/documentation" className="footer-link">Documentation</NavLink></li>
                        <li><NavLink to="/community" className="footer-link">Community</NavLink></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li><NavLink to="/privacy-policy" className="footer-link">Privacy Policy</NavLink></li>
                        <li><NavLink to="/terms-of-use" className="footer-link">Terms of Use</NavLink></li>
                        <li><NavLink to="/cookie-policy" className="footer-link">Cookie Policy</NavLink></li>
                    </ul>
                </div>
            </div>

            {/* Right side - Social Icons and Email Subscribe */}
            <div className="footer-right">
                {/* Social Media Icons */}
                <div className="social-icons">
                    <NavLink
                        to="#"
                        target="_blank"
                        className="social-media-link-icon"
                    >
                        <GitHub />
                    </NavLink>
                    <NavLink
                        to="#"
                        target="_blank"
                        className="social-media-link-icon"
                    >
                        <LinkedIn />
                    </NavLink>
                </div>

                <div className="subscribe">
                    <input
                        type="email"
                        placeholder="Subscribe to our Newsletter"
                        className="subscribe-input"
                    />
                    <button className="subscribe-btn">Subscribe</button>
                </div>
            </div>
        </div>
    );
}

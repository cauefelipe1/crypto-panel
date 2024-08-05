import './MainSideMenu.scss';
//import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom"

export default function MainSideMenu() {
    const featuresLinks = [
        {to: "/dashboard", Label: "Dashboard", icon: "fa-solid fa-gauge-high"},
        {to: "/trading-market", Label: "Trading Market", icon: "fa-solid fa-chart-simple"},
        {to: "/wallet", Label: "Wallet", icon: "fa-solid fa-wallet"},
        {to: "/messages", Label: "Messages", icon: "fa-solid fa-envelope"},
        {to: "/settings", Label: "Settings", icon: "fa-solid fa-gears"}
    ];

    const aditionalLinks = [
        {to: "/faq", Label: "FAQ", icon: "fa-solid fa-circle-question"},
        {to: "/academy", Label: "Academy", icon: "fa-solid fa-graduation-cap"},
        {to: "/logout", Label: "Logout", icon: "fa-solid fa-arrow-right-to-bracket"}
    ];

    return (
        <div className="side-menu">
            <div>
                <div className="logo">
                    Cryptopanel
                </div>

                <div className="features">

                    {featuresLinks.map((f) => (
                        <NavLink
                            key={f.to}
                            className="link"
                            to={f.to}
                        >
                            {
                                f.icon ? 
                                /* @ts-ignore */
                                <FontAwesomeIcon className="link-icon" icon={f.icon} /> : 
                                null
                            }
                            
                            {f.Label}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div>
                <div className="additional">
                    {aditionalLinks.map((f) => (
                        <NavLink
                            key={f.to}
                            className="link"
                            to={f.to}
                        >
                            {
                                f.icon ? 
                                /* @ts-ignore */
                                <FontAwesomeIcon className="link-icon" icon={f.icon} /> : 
                                null
                            }
                            {f.Label}
                        </NavLink>
                    ))}
                </div>

                <div className="chat-button">
                    <div className="chat-icon">
                        {/* @ts-ignore */}
                        <FontAwesomeIcon icon="fa-solid fa-comments" />
                    </div>
                </div>
            </div>
        </div>
        
    );
}
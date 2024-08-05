import "./NotFound.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NotFound(){
    return (
        <div className="not-found-container">
            <div className="not-found-icon">
                {/* @ts-ignore */}
                <FontAwesomeIcon icon="fa-regular fa-face-sad-tear" />
            </div>
            
            <p>404</p>

            <p>Page not found</p>

            <p>The Page you are looking for doesn't exist or an other error occured</p>
        </div>
    );
}
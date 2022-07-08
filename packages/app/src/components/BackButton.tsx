import { Link } from 'react-router-dom';
import './BackButton.css';

export default function BackButton() {
  return (
    <Link to="/" className="backButton">
      <div className="greyCircle">
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 20L0 10L10 0L11.4 1.425L2.825 10L11.4 18.575L10 20Z"
            fill="#1E1E1E"
          />
        </svg>
      </div>
      Back
    </Link>
  );
}

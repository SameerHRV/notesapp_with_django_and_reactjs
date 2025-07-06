import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-icon">🔍</div>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-text">Sorry, the page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="not-found-button">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;

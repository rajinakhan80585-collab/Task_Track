import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/NotFoundPage.css';

/**
 * NotFoundPage Component
 * Displays an attractive and interactive 404 error page with animations
 * Provides helpful navigation options and a playful design
 */
const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="not-found-container">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="not-found-content">
        <div className="error-animation">
          <div className="error-code">4</div>
          <div className="error-code error-code-2">0</div>
          <div className="error-code error-code-3">4</div>
        </div>

        <div className="sad-face" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className={`face ${isHovering ? 'happy' : ''}`}>
            <div className="eye eye-left"></div>
            <div className="eye eye-right"></div>
            <div className={`mouth ${isHovering ? 'smile' : 'sad'}`}></div>
          </div>
        </div>

        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Oops! The page you're looking for seems to have gone on a little adventure. 
          Don't worry, we can help you get back on track!
        </p>

        <div className="suggestions">
          <p className="suggestion-title">💡 Here's what you can do:</p>
          <ul className="suggestion-list">
            <li>Check the URL for typos</li>
            <li>Go back to the dashboard to continue working</li>
            <li>Return to login to start fresh</li>
          </ul>
        </div>

        <div className="not-found-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/login')}
          >
            🏠 Home
          </button>
        </div>

        <div className="footer-text">
          <p>Error Code: <code>404 - Not Found</code></p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

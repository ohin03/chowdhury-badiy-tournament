import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="khela-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h5 className="footer-title">🏆 Chowdhury Badiy Tournament</h5>
            <p className="footer-description">
              A modern, area-based sports tournament management system for Badminton, Football, and Cricket.
            </p>
            <p className="footer-credit text-warning">
              © {new Date().getFullYear()} | Developed by Ohin
            </p>

          </div>

          <div className="footer-section">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/tournaments">Tournaments</a></li>
              
              <li><a href="/teams">Teams</a></li>
              <li><a href="/players">Players</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h5 className="footer-title">Sports Supported</h5>
            <ul className="footer-links">
              <li>🏸 Badminton</li>
              <li>⚽ Football</li>
              <li>🏏 Cricket</li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-credit">
            <strong>Mohipal Chowdhury Badiy</strong> • Local Area Sports Tournament Platform
          </p>
          <p className="footer-copyright">
            © {currentYear} Chowdhury Badiy Tournament. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

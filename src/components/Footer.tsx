import { HouseHeartIcon } from "./HouseHeartIcon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="brand-link">
              <HouseHeartIcon className="brand-icon" />
              <span className="brand">
                <em>Hart</em> Hosting
              </span>
            </a>
            <p>
              Professional Airbnb co-hosting and short-term rental management for homeowners
              across Surrey &amp; the Lower Mainland, BC.
            </p>
          </div>
          <div className="footer-col">
            <h4>Site</h4>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#assessment">Assessment</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:+16049964541">(604) 996-4541</a>
            <a href="mailto:sam@harthosting.ca">sam@harthosting.ca</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Hart Hosting. All rights reserved.</span>
          <span>
            <a href="#">Privacy Policy</a> &nbsp;·&nbsp; <a href="#">Terms of Service</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

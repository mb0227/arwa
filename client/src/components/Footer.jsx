import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">
        {/* Background layer */}
        <div className="footer-bg"></div>
        
        {/* Decorative shapes container */}
        <div className="footer-decorative">
          <div className="decorative-shape decorative-shape-1"></div>
          <div className="decorative-shape decorative-shape-2"></div>
          <div className="decorative-circle"></div>
          {/* <div className="decorative-bar"></div> */}
        </div>

        {/* Main content */}
        <div className="footer-content">
          {/* Left side - Logo */}
          <div className="footer-left">
            <div className="footer-logo-complex">
              <img src="/LOGO for footer.png" alt="ARWA Logo" />
            </div>
          </div>

          {/* Center content */}
          <div className="footer-center">
            <h2 className="footer-heading">Want to collaborate?</h2>
            <p className="footer-description">
              You can submit an enquiry or email me directly,<br/>
              Let's create something beautiful together.
            </p>
            <Link to="/book-a-call" className="footer-cta-btn">
              Let's Start
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="cta-arrow">
                <path d="M6 0L12 5L6 10" stroke="#383838" strokeWidth="1.8"/>
                <path d="M0 5H12" stroke="#383838" strokeWidth="1.8"/>
              </svg>
            </Link>
          </div>

          {/* Right side */}
          <div className="footer-right">
            <p className="footer-instagram-text">Check out my Instagram for the latest drops!</p>
            <div className="footer-logo-simple">
              <img src="/footer arrow.png" alt="Arrow" />
            </div>
          </div>
        </div>

        {/* Bottom bar with social links */}
        <div className="footer-bottom">
          <div className="footer-bottom-bar">
            <div className="footer-email">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_406_578)">
                  <path d="M22.996 9.66504L5.31834 16.029C5.14034 16.0931 4.98416 16.2064 4.86796 16.3556C4.75176 16.5049 4.68029 16.6841 4.66185 16.8724C4.64341 17.0607 4.67877 17.2504 4.76381 17.4194C4.84884 17.5884 4.98008 17.7298 5.14227 17.8272L11.9991 21.9418L16.1137 28.7986C16.2106 28.9615 16.3519 29.0935 16.521 29.179C16.6901 29.2646 16.8801 29.3002 17.0687 29.2817C17.2574 29.2633 17.4368 29.1915 17.5862 29.0747C17.7355 28.958 17.8485 28.8012 17.9119 28.6226L24.2759 10.9449C24.3402 10.7663 24.3525 10.5731 24.3111 10.3878C24.2697 10.2026 24.1765 10.0329 24.0422 9.89867C23.908 9.76444 23.7383 9.67119 23.5531 9.62982C23.3678 9.58845 23.1746 9.60066 22.996 9.66504ZM16.7431 25.9617L14.4308 22.108L17.6779 16.2631L11.8329 19.5101L7.97918 17.1978L21.6737 12.2672L16.7431 25.9617Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_406_578">
                    <rect width="24" height="24" fill="white" transform="translate(0 16.9706) rotate(-45)"/>
                  </clipPath>
                </defs>
              </svg>
              <span>arwa.designstudio@gmail.com</span>
            </div>
            <div className="footer-social">
              <span className="social-label">Follow me:</span>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_406_570)">
                      <path d="M3.66602 7.33073C3.66602 6.35827 4.05232 5.42564 4.73996 4.738C5.42759 4.05037 6.36022 3.66406 7.33268 3.66406H14.666C15.6385 3.66406 16.5711 4.05037 17.2587 4.738C17.9464 5.42564 18.3327 6.35827 18.3327 7.33073V14.6641C18.3327 15.6365 17.9464 16.5692 17.2587 17.2568C16.5711 17.9444 15.6385 18.3307 14.666 18.3307H7.33268C6.36022 18.3307 5.42759 17.9444 4.73996 17.2568C4.05232 16.5692 3.66602 15.6365 3.66602 14.6641V7.33073Z" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.25 11C8.25 11.7293 8.53973 12.4288 9.05546 12.9445C9.57118 13.4603 10.2707 13.75 11 13.75C11.7293 13.75 12.4288 13.4603 12.9445 12.9445C13.4603 12.4288 13.75 11.7293 13.75 11C13.75 10.2707 13.4603 9.57118 12.9445 9.05546C12.4288 8.53973 11.7293 8.25 11 8.25C10.2707 8.25 9.57118 8.53973 9.05546 9.05546C8.53973 9.57118 8.25 10.2707 8.25 11Z" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.125 6.875V6.885" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_406_570">
                        <rect width="22" height="22" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.397 20.9969V12.8009H16.162L16.573 9.59193H13.397V7.54792C13.397 6.62192 13.655 5.98793 14.984 5.98793H16.668V3.12693C15.8487 3.03912 15.0251 2.99672 14.201 2.99993C11.757 2.99993 10.079 4.49193 10.079 7.23093V9.58593H7.33203V12.7949H10.085V20.9969H13.397Z" fill="#383838"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.98292 7.19631C6.19132 7.19631 7.17092 6.21671 7.17092 5.00831C7.17092 3.79991 6.19132 2.82031 4.98292 2.82031C3.77452 2.82031 2.79492 3.79991 2.79492 5.00831C2.79492 6.21671 3.77452 7.19631 4.98292 7.19631Z" fill="#383838"/>
                    <path d="M9.2377 8.85469V20.9937H13.0067V14.9907C13.0067 13.4067 13.3047 11.8727 15.2687 11.8727C17.2057 11.8727 17.2297 13.6837 17.2297 15.0907V20.9947H21.0007V14.3377C21.0007 11.0677 20.2967 8.55469 16.4747 8.55469C14.6397 8.55469 13.4097 9.56169 12.9067 10.5147H12.8557V8.85469H9.2377ZM3.0957 8.85469H6.8707V20.9937H3.0957V8.85469Z" fill="#383838"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter/X">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.2726 2.75H19.0838L12.9421 9.73922L20.1673 19.25H14.51L10.079 13.4818L5.00894 19.25H2.19601L8.76518 11.7742L1.83398 2.75H7.63491L11.6401 8.02238L16.2726 2.75ZM15.2859 17.5746H16.8437L6.78848 4.33738H5.11687L15.2859 17.5746Z" fill="#383838"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
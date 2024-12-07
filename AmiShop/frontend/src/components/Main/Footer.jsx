import React from "react";
import logo from "../../data/logo.png";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10 w-full">
      {/* Company Logo & Description */}
      <aside>
        <div className="max-w-32 max-h-32 overflow-hidden">
          <img
            src={logo}
            alt="AmiShop"
            className="w-24 h-24"
          />
        </div>
        <p>
          Exclusive deals, premium quality products.
        </p>
      </aside>

      {/* Shop */}
      <nav>
        <h6 className="footer-title">Shop</h6>
        <a className="link link-hover">Mobile Phones</a>
        <a className="link link-hover">Laptops</a>
        <a className="link link-hover">Home Appliances</a>
        <a className="link link-hover">Wearables</a>
      </nav>

      {/* Support */}
      <nav>
        <h6 className="footer-title">Support</h6>
        <a className="link link-hover">Help Center</a>
        <a className="link link-hover">Shipping & Returns</a>
        <a className="link link-hover">Warranty</a>
        <a className="link link-hover">Track Order</a>
      </nav>

      {/* Legal */}
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of Service</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Refund Policy</a>
      </nav>

      {/* Social Media */}
      <nav>
        <h6 className="footer-title">Follow Us</h6>
        <div className="flex space-x-4">
          <a className="link link-hover" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.04c-5.523 0-10 4.477-10 10 0 4.422 3.589 8.19 8.227 9.77-.075-.782-.146-2.1.032-3.006.158-.797 1.01-5.06 1.01-5.06s-.257-.512-.257-1.267c0-1.186.689-2.071 1.546-2.071.729 0 1.083.547 1.083 1.203 0 .732-.465 1.828-.705 2.844-.201.89.429 1.612 1.273 1.612 1.526 0 2.696-1.607 2.696-3.921 0-2.047-1.466-3.476-3.565-3.476-2.428 0-3.853 1.822-3.853 3.708 0 .732.282 1.515.634 1.94.072.085.082.159.061.245-.067.294-.219.931-.248 1.058-.04.165-.134.201-.311.121-1.154-.536-1.878-2.221-1.878-3.57 0-2.913 2.117-5.596 6.105-5.596 3.204 0 5.696 2.287 5.696 5.34 0 3.182-2.006 5.753-4.788 5.753-.933 0-1.81-.488-2.107-1.048l-.573 2.181c-.208.806-.774 1.813-1.154 2.429.866.267 1.778.415 2.729.415 5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
            </svg>
          </a>
          <a className="link link-hover" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.46 6c-.77 3.24-3.2 6.42-6.55 8.22-1.13.6-2.31.95-3.53.95-1.15 0-2.26-.34-3.21-.95C6.34 12.4 3.89 9.23 3.11 6c-.76-3.24 1.53-6 4.54-6h8.7c3.02 0 5.31 2.75 4.55 6z" />
            </svg>
          </a>
          <a className="link link-hover" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.68 2.33a7.35 7.35 0 01-2.06.57A3.72 3.72 0 0019.13.31a7.29 7.29 0 01-2.34.89 3.68 3.68 0 00-6.3 2.52 3.63 3.63 0 00.1.84A10.46 10.46 0 011.13.6a3.68 3.68 0 001.14 4.91 3.73 3.73 0 01-1.67-.46v.05a3.68 3.68 0 002.95 3.6 3.74 3.74 0 01-1.67.06 3.68 3.68 0 003.43 2.56A7.38 7.38 0 010 16.42a10.42 10.42 0 005.65 1.66c6.79 0 10.5-5.63 10.5-10.5 0-.16-.01-.31-.02-.47A7.5 7.5 0 0020 3.14a7.35 7.35 0 01-2.14.59 3.68 3.68 0 001.61-2.02z" />
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

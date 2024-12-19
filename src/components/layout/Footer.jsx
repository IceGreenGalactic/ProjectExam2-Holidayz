import React from "react";
import {
  FooterContainer,
  FooterLinks,
  FooterLink,
  SocialIcons,
  SocialIcon,
  Copyright,
} from "./Layout.styles.js";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink to="/about-us">About Us</FooterLink>
        <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
        <FooterLink to="/faq">FAQ</FooterLink>
        <FooterLink to="/contact-us">Contact Us</FooterLink>
      </FooterLinks>
      <SocialIcons>
        <SocialIcon href="#">
          <i className="bi bi-facebook"></i>
        </SocialIcon>
        <SocialIcon href="#">
          <i className="bi bi-twitter"></i>
        </SocialIcon>
        <SocialIcon href="#">
          <i className="bi bi-instagram"></i>
        </SocialIcon>
      </SocialIcons>
      <Copyright>
        <p>&copy; 2024 Holidaze. All Rights Reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;

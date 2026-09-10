import React from "react";
import { useNavigate } from "react-router-dom";
import BrandMark from "./BrandMark.jsx";

const Footer = () => {
  const navigate = useNavigate();

  const companyLinks = [
    { label: "Home", to: "/" },
    { label: "All Doctors", to: "/doctors" },
    { label: "About us", to: "/about" },
    { label: "Contact us", to: "/contact" },
  ];

  const goTo = (to) => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <BrandMark textClassName="text-lg" className="mb-5" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6 mt-4">
            SDM Hospital Ujire is committed to providing accessible, quality
            healthcare — combining trusted specialists with a simple,
            hassle-free way to book your appointments online.
          </p>
        </div>
        {/* Center Section */}
        <div>
          <p className="text-xl font-display font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {companyLinks.map((link) => (
              <li
                key={link.to}
                onClick={() => goTo(link.to)}
                className="cursor-pointer w-fit hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </li>
            ))}
          </ul>
        </div>
        {/* Right Section */}
        <div>
          <p className="text-xl font-display font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-82490-01710</li>
            <li>info@sdmhospitalujire.org</li>
            <li>Ujire, Dakshina Kannada, Karnataka</li>
          </ul>
        </div>
      </div>
      <div>
        {/* Copyright Text */}
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2026 @ SDM Hospital Ujire - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ContactView from "../adminDeshboard/ContacView";



function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate=useNavigate();
  const [activeContent, setActiveContent] = useState(() => {
    // Retrieve active content from sessionStorage or default to 'Home'
    return sessionStorage.getItem('activeContent') || 'Contact View';
  });

  useEffect(() => {
    // Save active content to sessionStorage whenever it changes
    sessionStorage.setItem('activeContent', activeContent);
  }, [activeContent]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('influencer'); // Remove influencer token
    sessionStorage.removeItem('activeContent'); // Clear active content
    setIsMobileMenuOpen(false);
    navigate("/")
    setActiveContent('Login'); // Show login content
  };

  const handleMenuClick = (label) => {
    setActiveContent(label);
    setIsMobileMenuOpen(false); // Close mobile menu on click
  };

  // Render content based on activeContent
  const renderContent = () => {
    switch (activeContent) {
      case 'Contact View':
        return <ContactView />;
      default:
        return <div className="p-8 bg-gray-50"><h1 className="text-3xl font-bold text-[#833ab4]">Other1</h1><p className="text-gray-600">This is the other1 content.</p></div>; // Fallback to Home
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar
          onMenuClick={handleMenuClick}
          onLogout={handleLogout}
          activeContent={activeContent}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>

      {/* Mobile Hamburger */}
      {!isMobileMenuOpen &&
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-md shadow-lg hover:bg-[#20c997] transition-colors duration-200"
        >
          <FiMenu size={24} />
        </button>
      </div>
}
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileSidebar
            onMenuClick={handleMenuClick}
            onLogout={handleLogout}
            activeContent={activeContent}
            closeMenu={toggleMobileMenu}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
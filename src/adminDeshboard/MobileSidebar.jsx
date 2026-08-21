import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiPackage, FiUser, FiLogOut, FiX, FiCircle } from 'react-icons/fi';

const menuItems = [
  { label: 'Contact View', icon: FiHome },

];

function MobileSidebar({ onMenuClick, onLogout, activeContent, closeMenu }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="fixed top-0 right-0 h-full w-64 bg-white text-black p-4 flex flex-col z-40 shadow-lg"
    >
      {/* Header with Logo and Close Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-transparent bg-clip-text">
          Logo
        </h1>
        <button
          onClick={closeMenu}
          className="p-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-md hover:bg-[#20c997] transition-colors duration-200"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto" style={{ direction: 'ltr' }}>
        <div style={{ direction: 'ltr' }}>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => onMenuClick(item.label)}
                  className={`flex items-center gap-2 w-full text-left p-2 rounded-md transition-colors duration-200 ${
                    activeContent === item.label
                      ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-sm'
                      : 'hover:bg-[#20c997] hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-2 mt-auto p-2 rounded-md bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:bg-[#20c997] transition-colors duration-200 shadow-lg"
      >
        <FiLogOut size={20} />
        Logout
      </button>
    </motion.div>
  );
}

export default MobileSidebar;
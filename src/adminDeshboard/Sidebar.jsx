import React from 'react';
import { FiHome, FiPackage, FiUser, FiLogOut, FiCircle } from 'react-icons/fi';

const menuItems = [
  { label: 'Contact View', icon: FiHome },
];

function Sidebar({ onMenuClick, onLogout, activeContent }) {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white text-black p-4 flex flex-col border-r border-gray-200 shadow-md">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-transparent bg-clip-text">
          Logo
        </h1>
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto hide-scrollbar" style={{ direction: 'rtl' }}>
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
    </div>
  );
}

export default Sidebar;
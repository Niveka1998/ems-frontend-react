import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-40" style={{width: '1280px'}}>
      <div className="flex items-center justify-between px-6 py-4 min-h-[64px]">
        {/* Left side - Dashboard title */}
        <h1 className="text-xl font-bold text-gray-800 tracking-wider" style={{fontSize: '20px'}}>
          DASHBOARD
        </h1>
        
        {/* Right side - Search and icons */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-48 lg:w-64 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Menu icon */}
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* Notification bell */}
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
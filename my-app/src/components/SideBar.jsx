// import React, { useState } from 'react';
// import { BarChart3, DollarSign, PieChart, Grid3X3, User } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';

// const ExpenseSidebar = () => {
//   const [activeItem, setActiveItem] = useState('dashboard');

//   const menuItems = [
//     { id: 'dashboard', label: 'DASHBOARD', icon: BarChart3 },
//     { id: 'expenses', label: 'EXPENSES', icon: DollarSign },
//     { id: 'budgets', label: 'BUDGETS', icon: PieChart },
//     { id: 'categories', label: 'CATEGORIES', icon: Grid3X3 }
//   ];

//   return (
//     <div className="bg-gray-900 text-white h-screen w-64 flex flex-col">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-700">
//         <div className="flex items-center justify-center mb-4">
//           <div className="w-16 h-16 bg-teal-400 rounded-lg flex items-center justify-center">
//             <div className="text-gray-900 font-bold">
//               <div className="text-xs">💰</div>
//             </div>
//           </div>
//         </div>
//         <h1 className="text-white font-bold text-sm tracking-wide text-center">
//           MONEY MIA
//         </h1>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 py-6">
//         <ul className="space-y-2 px-4">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;
            
//             return (
//               <li key={item.id}>
//                 <Link
//                   to={item.path}
//                   className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
//                     isActive
//                       ? 'bg-teal-500 text-white'
//                       : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5 mr-3" />
//                   <span className="font-medium text-sm tracking-wide">
//                     {item.label}
//                   </span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User Profile */}
//       <div className="p-6 border-t border-gray-700">
//         <div className="flex items-center">
//           <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
//             <User className="w-4 h-4 text-gray-300" />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-white">User Name</p>
//             <p className="text-xs text-gray-400">CH@gmail.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExpenseSidebar;


import React, { useState } from 'react';
import { BarChart3, DollarSign, PieChart, Grid3X3, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const ExpenseSidebar = () => {
  const location = useLocation(); // Get the current location

  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: BarChart3, path: '/dashboard' },
    { id: 'expenses', label: 'EXPENSES', icon: DollarSign, path: '/expenses' },
    { id: 'budgets', label: 'BUDGETS', icon: PieChart, path: '/budgets' },
    { id: 'categories', label: 'CATEGORIES', icon: Grid3X3, path: '/categories' }
  ];

  return (
    <div className="bg-gray-900 text-white h-screen w-64 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-teal-400 rounded-lg flex items-center justify-center">
            <div className="text-gray-900 font-bold">
              <div className="text-xs">💰</div>
            </div>
          </div>
        </div>
        <h1 className="text-white font-bold text-sm tracking-wide text-center">
          MONEY MIA
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium text-sm tracking-wide">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">User Name</p>
            <p className="text-xs text-gray-400">CH@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSidebar;
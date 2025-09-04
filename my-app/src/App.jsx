import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Expenses from "./components/ExpenseDashboard";
import Budgets from "./components/BudgetDashboard";
import Categories from "./components/CategoryDashboard";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar - Fixed width */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Main Content Area - Takes remaining space */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Navbar */}
          <Navbar />
          
          {/* Page Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
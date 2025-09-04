import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalExpenses: 0,
    totalBudgets: 0,
    totalCategories: 0,
    recentExpenses: []
  });

  useEffect(() => {
    // Fetch data from all services
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch expenses
      const expensesResponse = await fetch('http://localhost:8084/expense/get-all-expenses');
      const expenses = await expensesResponse.json();

      // Fetch budgets
      const budgetsResponse = await fetch('http://localhost:8083/budget/get-all-budgets');
      const budgets = await budgetsResponse.json();

      // Fetch categories
      const categoriesResponse = await fetch('http://localhost:8082/category/get-all-categories');
      const categories = await categoriesResponse.json();

      // Calculate total expenses amount
      const totalExpensesAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

      // Calculate total budget amount
      const totalBudgetAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0);

      setStats({
        totalExpenses: totalExpensesAmount,
        totalBudgets: totalBudgetAmount,
        totalCategories: categories.length,
        recentExpenses: expenses.slice(-5) // Last 5 expenses
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Money Mia Dashboard
          </h2>
          <p className="text-gray-600">
            Track your finances with ease - monitor your balance, income, expenses, and spending categories.
          </p>
        </div>
        
        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">${stats.totalExpenses.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-1">This month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Budget</h3>
            <p className="text-2xl font-bold text-blue-600">${stats.totalBudgets.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-1">Available budget</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Remaining Budget</h3>
            <p className="text-2xl font-bold text-green-600">${(stats.totalBudgets - stats.totalExpenses).toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-1">Available to spend</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Categories</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.totalCategories}</p>
            <p className="text-xs text-gray-400 mt-1">Total categories</p>
          </div>
        </div>
        
        {/* Recent Expenses Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentExpenses.length > 0 ? (
                stats.recentExpenses.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {expense.title ? expense.title.charAt(0).toUpperCase() : 'E'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{expense.title || 'Expense'}</p>
                        <p className="text-xs text-gray-500">{expense.description || 'No description'}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-red-600">-${expense.amount}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No expenses found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
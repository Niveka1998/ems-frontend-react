import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    budgetTitle: '',
    amount: '',
    year: new Date().getFullYear(),
    month: (new Date().getMonth() + 1)
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await fetch('http://localhost:8083/budget/get-all-budgets');
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Check if we're editing and get the ID from editingBudget
    let url = 'http://localhost:8083/budget/add-new-budget';
    let method = 'POST';
    
    if (editingBudget) {
      // Get the ID from the editingBudget object
      const budgetId = editingBudget.id || editingBudget.budgetId;
      
      if (!budgetId) {
        alert('Error: Cannot update budget without an ID');
        return;
      }
      
      url = `http://localhost:8083/budget/update-budget/${budgetId}`;
      method = 'PUT';
    }
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        amount: parseFloat(formData.amount),
        year: parseInt(formData.year),
        month: parseInt(formData.month)
      }),
    });

    if (response.ok) {
      fetchBudgets();
      resetForm();
      setShowModal(false);
    } else {
      alert('Error saving budget');
    }
  } catch (error) {
    console.error('Error saving budget:', error);
    alert('Error saving budget');
  }
};

  const handleEdit = (budget) => {
  console.log('Budget object when editing:', budget);
  console.log('Budget ID:', budget?.id || budget?.budgetId || budget?.budget_id);
  
  // Store the entire budget object for editing
  setEditingBudget(budget);
  setFormData({
    budgetTitle: budget.budgetTitle || '',
    amount: budget.amount?.toString() || '',
    year: budget.year?.toString() || new Date().getFullYear().toString(),
    month: budget.month?.toString() || (new Date().getMonth() + 1).toString()
  });
  setShowModal(true);
};
//   const handleDelete = async (budget) => {
//   // Get the ID from the budget object
//   const budgetId = budget.budgetId || budget.id || budget?.budget_id;
  
//   if (!budgetId) {
//     console.error('Cannot delete: Budget ID is missing', budget);
//     alert('Cannot delete budget: ID is missing');
//     return;
//   }
  
//   if (window.confirm('Are you sure you want to delete this budget?')) {
//     try {
//       await fetch(`http://localhost:8083/budget/${budgetId}`, {
//         method: 'DELETE',
//       });
//       fetchBudgets();
//     } catch (error) {
//       console.error('Error deleting budget:', error);
//     }
//   }
// };


const handleDelete = async (budget) => {
  if (!budget) {
    console.error('Delete failed: budget object is missing');
    return;
  }

  const budgetId = budget.budgetId || budget.id || budget.budget_id;

  if (!budgetId) {
    console.error('Cannot delete: Budget ID is missing', budget);
    alert('Cannot delete budget: ID is missing');
    return;
  }

  if (window.confirm('Are you sure you want to delete this budget?')) {
    try {
      await fetch(`http://localhost:8083/budget/${budgetId}`, {
        method: 'DELETE',
      });
      fetchBudgets();
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  }
};

  const resetForm = () => {
    setFormData({
      budgetTitle: '',
      amount: '',
      year: new Date().getFullYear().toString(),
      month: (new Date().getMonth() + 1).toString()
    });
    setEditingBudget(null);
  };

  const getMonthName = (monthNum) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNum - 1] || 'Unknown';
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Budgets</h2>
            <p className="text-gray-600">Manage your monthly budgets</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Budget</span>
          </button>
        </div>

        {/* Budget Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {budgets.map((budget) => (
            <div key={budget.budgetId} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {budget.budgetTitle}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {getMonthName(budget.month)} {budget.year}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(budget)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(budget)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-green-600 mr-1" />
                <span className="text-2xl font-bold text-green-600">
                  {budget.amount}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: '70%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">70% remaining</p>
            </div>
          ))}
        </div>

        {budgets.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="text-gray-400 mb-4">
              <DollarSign className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets found</h3>
            <p className="text-gray-500 mb-6">Create your first budget to start tracking your finances</p>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Budget</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingBudget ? 'Edit Budget' : 'Add New Budget'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Title
                  </label>
                  <input
                    type="text"
                    value={formData.budgetTitle}
                    onChange={(e) => setFormData({...formData, budgetTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                    placeholder="e.g., Monthly Expenses"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                    placeholder="0.00"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      required
                      min="2020"
                      max="2030"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Month
                    </label>
                    <select
                      value={formData.month}
                      onChange={(e) => setFormData({...formData, month: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      required
                    >
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingBudget ? 'Update' : 'Add'} Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
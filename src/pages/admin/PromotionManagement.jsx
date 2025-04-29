// src/pages/admin/PromotionManagement.js

import React, { useState } from "react";

function PromotionManagement() {
  const [promotions, setPromotions] = useState([
    { id: 1, title: "Summer Sale", discount: 20, active: true },
    { id: 2, title: "New User Offer", discount: 10, active: false },
  ]);

  const [newPromotion, setNewPromotion] = useState({
    title: "",
    discount: "",
    active: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPromotion({
      ...newPromotion,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addPromotion = () => {
    if (newPromotion.title && newPromotion.discount) {
      setPromotions([...promotions, { id: Date.now(), ...newPromotion }]);
      setNewPromotion({ title: "", discount: "", active: true });
    }
  };

  const togglePromotionStatus = (id) => {
    setPromotions(
      promotions.map((promo) =>
        promo.id === id ? { ...promo, active: !promo.active } : promo
      )
    );
  };

  const deletePromotion = (id) => {
    setPromotions(promotions.filter((promo) => promo.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Promotion Management</h1>

      {/* Add New Promotion */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Promotion</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Promotion Title"
            value={newPromotion.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount Percentage"
            value={newPromotion.discount}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={newPromotion.active}
              onChange={handleInputChange}
            />
            <label>Active</label>
          </div>
          <button
            onClick={addPromotion}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Promotion
          </button>
        </div>
      </div>

      {/* Promotion List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Promotions</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Title</th>
              <th className="py-2">Discount (%)</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promo) => (
              <tr key={promo.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{promo.title}</td>
                <td className="py-2">{promo.discount}%</td>
                <td className="py-2">
                  {promo.active ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="py-2 flex gap-2">
                  <button
                    onClick={() => togglePromotionStatus(promo.id)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => deletePromotion(promo.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {promotions.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No promotions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PromotionManagement;

import React from 'react';
import { Bell } from 'lucide-react';

const NotificationCenter: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notification Center
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="space-y-4">
              {/* Notification filters */}
              <div className="flex gap-4 mb-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  All
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  Unread
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  Important
                </button>
              </div>

              {/* Sample notifications */}
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-blue-900">New Booking Request</h3>
                    <p className="text-blue-800 mt-1">A new booking request needs your attention.</p>
                  </div>
                  <span className="text-sm text-blue-700">5 min ago</span>
                </div>
              </div>

              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-yellow-900">System Update</h3>
                    <p className="text-yellow-800 mt-1">Scheduled maintenance in 2 hours.</p>
                  </div>
                  <span className="text-sm text-yellow-700">1 hour ago</span>
                </div>
              </div>

              <div className="border-l-4 border-gray-300 bg-gray-50 p-4 rounded-r-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">Payment Processed</h3>
                    <p className="text-gray-800 mt-1">Successfully processed payment for booking #12345.</p>
                  </div>
                  <span className="text-sm text-gray-700">2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-md bg-blue-600 text-white">1</button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">2</button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">3</button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
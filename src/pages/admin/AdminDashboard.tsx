import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  DollarSign,
  AlertTriangle,
  FileText,
  Bell,
  BarChart,
  Gift,
  ArrowUp,
  ArrowDown,
  TrendingUp
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard: React.FC = () => {
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 3500, 4200, 4800, 5100, 5800],
        borderColor: 'rgb(13, 148, 136)',
        tension: 0.4,
      },
    ],
  };

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      isPositive: true,
      icon: Users,
    },
    {
      title: 'Active Rentals',
      value: '186',
      change: '+8.2%',
      isPositive: true,
      icon: Calendar,
    },
    {
      title: 'Monthly Revenue',
      value: '$24,500',
      change: '+15.3%',
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: 'Open Disputes',
      value: '12',
      change: '-25%',
      isPositive: false,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                stat.icon === AlertTriangle ? 'bg-red-100 text-red-600' : 'bg-teal-100 text-teal-600'
              }`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-sm font-medium flex items-center ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.isPositive ? (
                  <ArrowUp size={16} className="mr-1" />
                ) : (
                  <ArrowDown size={16} className="mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue Overview</h2>
          <Line data={revenueData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `$${value}`,
                },
              },
            },
          }} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              to="/admin/users"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Users className="text-teal-600 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-gray-900">User Management</h3>
                <p className="text-sm text-gray-600">Manage user accounts and permissions</p>
              </div>
            </Link>
            
            <Link
              to="/admin/bookings"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar className="text-teal-600 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-gray-900">Booking Management</h3>
                <p className="text-sm text-gray-600">View and manage rental bookings</p>
              </div>
            </Link>
            
            <Link
              to="/admin/disputes"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <AlertTriangle className="text-teal-600 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-gray-900">Dispute Resolution</h3>
                <p className="text-sm text-gray-600">Handle customer disputes</p>
              </div>
            </Link>
            
            <Link
              to="/admin/promotions"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Gift className="text-teal-600 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-gray-900">Promotions</h3>
                <p className="text-sm text-gray-600">Manage discounts and offers</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <Link
          to="/admin/cms"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <FileText className="text-teal-600 mb-4" size={24} />
          <h3 className="font-medium text-gray-900 mb-1">CMS Management</h3>
          <p className="text-sm text-gray-600">Manage website content and pages</p>
        </Link>

        <Link
          to="/admin/notifications"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Bell className="text-teal-600 mb-4" size={24} />
          <h3 className="font-medium text-gray-900 mb-1">Notifications</h3>
          <p className="text-sm text-gray-600">Manage system notifications</p>
        </Link>

        <Link
          to="/admin/analytics"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <BarChart className="text-teal-600 mb-4" size={24} />
          <h3 className="font-medium text-gray-900 mb-1">Analytics</h3>
          <p className="text-sm text-gray-600">View detailed platform analytics</p>
        </Link>

        <Link
          to="/admin/commissions"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <TrendingUp className="text-teal-600 mb-4" size={24} />
          <h3 className="font-medium text-gray-900 mb-1">Commission Management</h3>
          <p className="text-sm text-gray-600">Manage platform commissions</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
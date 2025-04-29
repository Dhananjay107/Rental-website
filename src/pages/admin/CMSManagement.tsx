import React from 'react';
import { Settings } from 'lucide-react';

const CMSManagement: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <Settings className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">CMS Management</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid gap-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Management</h2>
            <p className="text-gray-600">Manage your website content, pages, and media assets here.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Pages</h3>
              <p className="text-sm text-gray-600">Create and edit website pages</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Media Library</h3>
              <p className="text-sm text-gray-600">Manage images and other media files</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Blog Posts</h3>
              <p className="text-sm text-gray-600">Write and publish blog content</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Navigation</h3>
              <p className="text-sm text-gray-600">Configure site navigation menus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSManagement;
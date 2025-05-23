'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Home, Plus, LogOut } from 'lucide-react';
import { adminLogout } from '@/firebase/auth';
import toast from 'react-hot-toast';

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    adminLogout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link
                href="/admin"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link
                href="/admin/add"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="text-gray-300 hover:text-white transition-colors"
            >
              View Site
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
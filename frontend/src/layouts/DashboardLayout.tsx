import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Button } from '../components/ui/button';
import { Menu, Plus } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Fixed Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />


      {/* Content Wrapper */}
      <div className="flex min-h-screen flex-col lg:ml-64">


        {/* Top Navigation */}
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-6">

          <div className="flex items-center gap-4">

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>


            {/* Empty space replacement */}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Welcome back 👋
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage and track your links
              </p>
            </div>

          </div>



          <div className="flex items-center gap-4">


            {/* Add Link Button */}
            <Button
              className="hidden sm:flex gap-2 bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate('/dashboard/links')}
            >
              <Plus className="w-4 h-4" />
              Add Link
            </Button>


            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />


            <UserButton afterSignOutUrl="/sign-in" />

          </div>

        </header>



        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>


      </div>

    </div>
  );
}
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  User,
  CreditCard,
  Settings,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { useSubscription } from "../../hooks/useSubscription";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { subscription } = useSubscription();
  const isFreePlan = subscription?.plan === "FREE";

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Links", href: "/dashboard/links", icon: Link2 },
    ...(isFreePlan
      ? []
      : [{ name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 }]),
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      > */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800",
          "flex flex-col h-screen",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ViaLink
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        <div className="hidden lg:flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ViaLink
            </span>
          </Link>
        </div>

        {/* <nav className="flex-1 overflow-y-auto p-4 space-y-1"> */}
        <nav className="flex-1 min-h-0 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== "/dashboard" &&
                location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/sign-in" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  Account
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Manage settings
                </span>
              </div>
            </div>
            <Link to="/dashboard/settings">
              <Settings className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

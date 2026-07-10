import { UserProfile } from '@clerk/clerk-react';

export function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <UserProfile
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-transparent shadow-none border-none',
              formFieldLabel: 'text-slate-700 dark:text-slate-300',
              formFieldInput: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
              profileSectionTitle: 'text-slate-900 dark:text-white',
              navbar: 'hidden',
              navbarMobileMenuButton: 'hidden',
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProfilePage;

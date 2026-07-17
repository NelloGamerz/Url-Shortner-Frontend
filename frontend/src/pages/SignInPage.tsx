import { SignIn } from '@clerk/clerk-react';
import { SEO } from '../components/SEO.tsx';

export function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <SEO
        title="Sign In | Vialink"
        description="Sign in to your Vialink account and manage your shortened links."
        keywords="vialink sign in, short link dashboard login"
        canonical="https://vialink.in/sign-in"
      />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Sign in to continue to your dashboard
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-transparent shadow-none border-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                formFieldLabel: 'text-slate-700 dark:text-slate-300',
                formFieldInput: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
                socialButtonsBlockButton: 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800',
                formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
                footerActionLink: 'text-indigo-600 dark:text-indigo-400',
              },
            }}
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;

// Simple password-based auth for demo purposes
// In production, use Firebase Authentication properly

export const adminLogin = (password: string): boolean => {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
  return password === adminPassword;
};

export const isAdminLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('adminAuth') === 'true';
};

export const setAdminAuth = (isAuthenticated: boolean) => {
  if (typeof window === 'undefined') return;
  if (isAuthenticated) {
    localStorage.setItem('adminAuth', 'true');
  } else {
    localStorage.removeItem('adminAuth');
  }
};

export const adminLogout = () => {
  setAdminAuth(false);
};
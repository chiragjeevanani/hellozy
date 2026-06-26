// Simple LocalStorage auth for admin MVP
const DEFAULT_EMAIL = 'admin@hellozy.com';
const DEFAULT_PASSWORD = 'hellozy@2026';

export const login = (email, password) => {
  try {
    const customEmail = localStorage.getItem('hellozy_admin_email') || DEFAULT_EMAIL;
    const customPass = localStorage.getItem('hellozy_admin_password') || DEFAULT_PASSWORD;
    if (email === customEmail && password === customPass) {
      localStorage.setItem('hellozy_admin_authenticated', 'true');
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem('hellozy_admin_authenticated');
  } catch (e) {}
};

export const isAuthenticated = () => {
  try {
    return localStorage.getItem('hellozy_admin_authenticated') === 'true';
  } catch (e) {
    return false;
  }
};

export const changeAdminCredentials = (currentPassword, newEmail, newPassword) => {
  try {
    const activePass = localStorage.getItem('hellozy_admin_password') || DEFAULT_PASSWORD;
    if (currentPassword === activePass) {
      if (newEmail) {
        localStorage.setItem('hellozy_admin_email', newEmail);
      }
      if (newPassword) {
        localStorage.setItem('hellozy_admin_password', newPassword);
      }
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

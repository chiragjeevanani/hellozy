// Simple global-like Store mock using localStorage to share registration data between module and admin dashboard
export const getRegistrations = () => {
  try {
    const list = localStorage.getItem('hellozy_registrations');
    return list ? JSON.parse(list) : [];
  } catch (e) {
    return [];
  }
};

export const saveRegistration = (data) => {
  try {
    const list = getRegistrations();
    const newReg = {
      id: 'HZ-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Pending',
      ...data
    };
    list.unshift(newReg);
    localStorage.setItem('hellozy_registrations', JSON.stringify(list));
    return newReg;
  } catch (e) {
    console.error("Failed to save registration", e);
    return null;
  }
};

export const updateRegistrationStatus = (id, status) => {
  try {
    const list = getRegistrations();
    const index = list.findIndex(r => r.id === id);
    if (index !== -1) {
      list[index].status = status;
      localStorage.setItem('hellozy_registrations', JSON.stringify(list));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const isPaymentEnabled = () => {
  try {
    return localStorage.getItem('hellozy_payment_enabled') === 'true';
  } catch (e) {
    return false;
  }
};

export const setPaymentEnabled = (enabled) => {
  try {
    localStorage.setItem('hellozy_payment_enabled', String(enabled));
  } catch (e) {}
};

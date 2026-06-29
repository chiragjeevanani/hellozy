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

// --- COMMISSION CONFIG STORE ---

export const getCommissionConfig = () => {
  try {
    const raw = localStorage.getItem('hellozy_commission_config');
    return raw ? JSON.parse(raw) : { type: 'percentage', value: 10 };
  } catch (e) {
    return { type: 'percentage', value: 10 };
  }
};

export const setCommissionConfig = (type, value) => {
  try {
    localStorage.setItem('hellozy_commission_config', JSON.stringify({ type, value }));
    return true;
  } catch (e) {
    return false;
  }
};

// Helper: calculate commission amount given a booking amount
export const calculateCommission = (bookingAmount) => {
  const config = getCommissionConfig();
  if (config.type === 'percentage') {
    return Math.round((bookingAmount * config.value) / 100);
  }
  return Number(config.value) || 0;
};

// --- EVENT MANAGEMENT MOCK DB STORE ---

const MOCK_ORGANIZERS = [
  {
    id: 'ORG-888888',
    createdAt: new Date().toISOString(),
    ownerName: 'Rahul Sharma',
    firmName: 'Vibrant Events Pvt Ltd',
    address: '102, Connaught Place, New Delhi',
    mobile: '9876543210',
    email: 'organizer@hellozy.com',
    password: 'organizer@2026',
    bankDetails: {
      bankName: 'State Bank of India',
      accountNo: '333444555666',
      accountType: 'Saving',
      ifscCode: 'SBIN0001234'
    }
  }
];

// 1. EVENT ORGANIZERS (Registered by Admin)
export const getOrganizers = () => {
  try {
    const list = localStorage.getItem('hellozy_organizers');
    if (!list) {
      localStorage.setItem('hellozy_organizers', JSON.stringify(MOCK_ORGANIZERS));
      return MOCK_ORGANIZERS;
    }
    return JSON.parse(list);
  } catch (e) {
    return [];
  }
};

export const saveOrganizer = (data) => {
  try {
    const list = getOrganizers();
    const newOrg = {
      id: 'ORG-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      ...data
    };
    list.unshift(newOrg);
    localStorage.setItem('hellozy_organizers', JSON.stringify(list));
    return newOrg;
  } catch (e) {
    console.error("Failed to save organizer", e);
    return null;
  }
};

export const authenticateOrganizer = (email, password) => {
  const list = getOrganizers();
  return list.find(org => org.email === email && org.password === password) || null;
};

// Update organizer credentials and/or profile fields
export const updateOrganizerCredentials = (orgId, updates) => {
  try {
    const list = getOrganizers();
    const index = list.findIndex(o => o.id === orgId);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      localStorage.setItem('hellozy_organizers', JSON.stringify(list));
      return list[index];
    }
    return null;
  } catch (e) {
    return null;
  }
};

// 2. EVENT TYPES (Custom categories added by Admin/Sub-admin)
export const getEventTypes = () => {
  try {
    const list = localStorage.getItem('hellozy_event_types');
    return list ? JSON.parse(list) : ['Wedding Ceremony', 'Concert Show', 'Birthday Party', 'Corporate Expo', 'Seminars'];
  } catch (e) {
    return [];
  }
};

export const saveEventType = (newType) => {
  try {
    const list = getEventTypes();
    if (!list.includes(newType)) {
      list.push(newType);
      localStorage.setItem('hellozy_event_types', JSON.stringify(list));
    }
    return list;
  } catch (e) {
    return [];
  }
};

// 3. EVENTS (Created by Organizer)
// rolePricing: { Participate: 500, Visitor: 200, Couple: 800, Sponsor: 0 }
export const getEvents = () => {
  try {
    const list = localStorage.getItem('hellozy_events');
    if (!list) {
      const mockEvents = [
        {
          id: 'EVT-999999',
          createdAt: new Date().toISOString(),
          organizerId: 'ORG-000000',
          organizerName: 'System Admin',
          title: 'Hellozy Annual Green Transit Summit 2026',
          eventType: 'Corporate Expo',
          description: 'Join Hellozy in our annual summit showcasing future eco-friendly electric rickshaws, mini logistics fleets, and smart transit capabilities. Sponsors, couples, visitors, and participants are welcome to register.',
          facilities: 'Catering, Free Wi-Fi, VIP Seating Lounge, Presentation Screen, Audio Systems',
          minSponsorAmount: 10000,
          bookingRoles: ['Participate', 'Visitor', 'Sponsor', 'Couple'],
          rolePricing: { Participate: 500, Visitor: 200, Couple: 800, Sponsor: 0 },
          eventImage: { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' },
          imageOrientation: 'landscape'
        }
      ];
      localStorage.setItem('hellozy_events', JSON.stringify(mockEvents));
      return mockEvents;
    }
    const parsed = JSON.parse(list);
    let modified = false;
    const enriched = parsed.map(evt => {
      if (!evt.eventImage) {
        evt.eventImage = { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' };
        evt.imageOrientation = 'landscape';
        modified = true;
      }
      return evt;
    });
    if (modified) {
      localStorage.setItem('hellozy_events', JSON.stringify(enriched));
    }
    return enriched;
  } catch (e) {
    return [];
  }
};

export const saveEvent = (data) => {
  try {
    const list = getEvents();
    const newEvent = {
      id: 'EVT-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      ...data
    };
    list.unshift(newEvent);
    localStorage.setItem('hellozy_events', JSON.stringify(list));
    return newEvent;
  } catch (e) {
    console.error("Failed to save event", e);
    return null;
  }
};

// 4. EVENT APPLICATIONS / SEAT BOOKINGS (Filled by public applicants)
export const getEventApplications = () => {
  try {
    const list = localStorage.getItem('hellozy_event_applications');
    return list ? JSON.parse(list) : [];
  } catch (e) {
    return [];
  }
};

export const saveEventApplication = (data) => {
  try {
    const list = getEventApplications();
    const bookingAmount = Number(data.bookingAmount) || 0;
    const commissionAmount = calculateCommission(bookingAmount);
    const newApp = {
      id: 'APP-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Pending', // Pending / Approved / Rejected
      paymentStatus: 'Pending', // Pending / Successful / Unsuccessful
      bookingAmount,
      commissionAmount,
      ...data
    };
    list.unshift(newApp);
    localStorage.setItem('hellozy_event_applications', JSON.stringify(list));
    return newApp;
  } catch (e) {
    console.error("Failed to save event application", e);
    return null;
  }
};

export const updateEventApplicationPaymentStatus = (id, paymentStatus) => {
  try {
    const list = getEventApplications();
    const index = list.findIndex(a => a.id === id);
    if (index !== -1) {
      list[index].paymentStatus = paymentStatus;
      localStorage.setItem('hellozy_event_applications', JSON.stringify(list));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const updateEventApplicationStatus = (id, status) => {
  try {
    const list = getEventApplications();
    const index = list.findIndex(a => a.id === id);
    if (index !== -1) {
      list[index].status = status;
      localStorage.setItem('hellozy_event_applications', JSON.stringify(list));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

// --- DYNAMIC ADVERTISING BANNER CAROUSEL STORE ---

const MOCK_BANNERS = [
  {
    id: 'BAN-100001',
    title: 'Hellozy Registration Campaign 1',
    imageUrl: '/poster-1.jpeg',
    linkUrl: '#register',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'BAN-100002',
    title: 'Hellozy Registration Campaign 2',
    imageUrl: '/poster-2.jpeg',
    linkUrl: '/event-registration',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const getBanners = () => {
  try {
    let list = localStorage.getItem('hellozy_banners');
    if (list && list.includes('unsplash.com')) {
      localStorage.removeItem('hellozy_banners');
      list = null;
    }
    if (!list) {
      localStorage.setItem('hellozy_banners', JSON.stringify(MOCK_BANNERS));
      return MOCK_BANNERS;
    }
    return JSON.parse(list);
  } catch (e) {
    return [];
  }
};

export const saveBanner = (data) => {
  try {
    const list = getBanners();
    const newBanner = {
      id: 'BAN-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      isActive: true,
      ...data
    };
    list.unshift(newBanner);
    localStorage.setItem('hellozy_banners', JSON.stringify(list));
    return newBanner;
  } catch (e) {
    console.error("Failed to save banner", e);
    return null;
  }
};

export const deleteBanner = (id) => {
  try {
    const list = getBanners();
    const filtered = list.filter(b => b.id !== id);
    localStorage.setItem('hellozy_banners', JSON.stringify(filtered));
    return true;
  } catch (e) {
    return false;
  }
};

export const toggleBannerActive = (id) => {
  try {
    const list = getBanners();
    const index = list.findIndex(b => b.id === id);
    if (index !== -1) {
      list[index].isActive = !list[index].isActive;
      localStorage.setItem('hellozy_banners', JSON.stringify(list));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};


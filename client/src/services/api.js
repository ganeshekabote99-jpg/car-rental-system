const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('vr_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeaders() },
    });
    if (!res.ok) throw new Error('Failed to load user profile');
    return res.json();
  },

  async updateProfile(updates) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update profile');
    return data;
  },

  // Vehicles
  async getVehicles(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '' && v !== 'All') {
        query.append(k, v);
      }
    });
    const res = await fetch(`${API_BASE}/vehicles?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    return res.json();
  },

  async getVehicleById(id) {
    const res = await fetch(`${API_BASE}/vehicles/${id}`);
    if (!res.ok) throw new Error('Vehicle not found');
    return res.json();
  },

  async createVehicle(vehicleData) {
    const res = await fetch(`${API_BASE}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(vehicleData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create vehicle');
    return data;
  },

  async updateVehicle(id, vehicleData) {
    const res = await fetch(`${API_BASE}/vehicles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(vehicleData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update vehicle');
    return data;
  },

  async deleteVehicle(id) {
    const res = await fetch(`${API_BASE}/vehicles/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete vehicle');
    return data;
  },

  async toggleMaintenance(id) {
    const res = await fetch(`${API_BASE}/vehicles/${id}/maintenance`, {
      method: 'POST',
      headers: { ...getAuthHeaders() },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to toggle maintenance');
    return data;
  },

  // Smart Pricing Preview
  async previewPrice(payload) {
    const res = await fetch(`${API_BASE}/bookings/preview-price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Price calculation failed');
    return data;
  },

  // Bookings
  async createBooking(bookingPayload) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(bookingPayload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Booking creation failed');
    return data;
  },

  async getMyBookings() {
    const res = await fetch(`${API_BASE}/bookings/my-bookings`, {
      headers: { ...getAuthHeaders() },
    });
    if (!res.ok) throw new Error('Failed to fetch reservations');
    return res.json();
  },

  async getBookingById(id) {
    const res = await fetch(`${API_BASE}/bookings/${id}`, {
      headers: { ...getAuthHeaders() },
    });
    if (!res.ok) throw new Error('Booking not found');
    return res.json();
  },

  async cancelBooking(id) {
    const res = await fetch(`${API_BASE}/bookings/${id}/cancel`, {
      method: 'PUT',
      headers: { ...getAuthHeaders() },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Cancellation failed');
    return data;
  },

  async verifyQr(token) {
    const res = await fetch(`${API_BASE}/bookings/verify/${token}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Verification failed');
    return data;
  },

  // Admin
  async getAdminAnalytics() {
    const res = await fetch(`${API_BASE}/admin/analytics`, {
      headers: { ...getAuthHeaders() },
    });
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  },

  async getAllAdminBookings() {
    const res = await fetch(`${API_BASE}/admin/bookings`, {
      headers: { ...getAuthHeaders() },
    });
    if (!res.ok) throw new Error('Failed to fetch all bookings');
    return res.json();
  },

  async updateBookingStatus(id, status) {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Status update failed');
    return data;
  },

  async getPricingConfig() {
    const res = await fetch(`${API_BASE}/admin/pricing-config`, {
      headers: { ...getAuthHeaders() },
    });
    if (!res.ok) throw new Error('Failed to fetch pricing config');
    return res.json();
  },

  async updatePricingConfig(config) {
    const res = await fetch(`${API_BASE}/admin/pricing-config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(config),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update pricing');
    return data;
  },

  // AI Recommendations
  async getAiRecommendations(payload) {
    const res = await fetch(`${API_BASE}/ai/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'AI recommendations failed');
    return data;
  },

  // Live Telematics GPS
  async getTelematics(vehicleId) {
    const res = await fetch(`${API_BASE}/telematics/${vehicleId}`);
    if (!res.ok) throw new Error('Telematics feed unavailable');
    return res.json();
  },

  // Chatbot
  async sendChatMessage(message) {
    const res = await fetch(`${API_BASE}/chatbot/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Chatbot service error');
    return data;
  },
};


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("platformToken");

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ==================== BILLING ====================

export const billingApi = {
  // Create Razorpay order
  createOrder: async (plan, billingCycle) => {
    const token = localStorage.getItem("codexToken"); // Use main auth token
    const response = await fetch(`${API_URL}/api-platform/billing/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan, billingCycle }),
    });
    return response.json();
  },

  // Verify payment after Razorpay checkout
  verifyPayment: async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    const token = localStorage.getItem("codexToken");
    const response = await fetch(`${API_URL}/api-platform/billing/verify-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
      }),
    });
    return response.json();
  },

  // Get subscription details
  getSubscription: async () => {
    const response = await fetch(`${API_URL}/api-platform/billing/subscription`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Cancel subscription
  cancelSubscription: async () => {
    const response = await fetch(`${API_URL}/api-platform/billing/cancel`, {
      method: "POST",
      headers: getHeaders(),
    });
    return response.json();
  },

  // Rotate API key
  rotateKey: async () => {
    const response = await fetch(`${API_URL}/api-platform/billing/rotate-key`, {
      method: "POST",
      headers: getHeaders(),
    });
    return response.json();
  },
};

// ==================== AUTH ====================

export const authApi = {
  // Login with platform ID or email
  login: async (platformIdOrEmail, password) => {
    const isEmail = platformIdOrEmail.includes("@");
    const response = await fetch(`${API_URL}/api-platform/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        [isEmail ? "email" : "platformId"]: platformIdOrEmail,
        password,
      }),
    });
    return response.json();
  },

  // Get current user profile
  getMe: async () => {
    const response = await fetch(`${API_URL}/api-platform/auth/me`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await fetch(`${API_URL}/api-platform/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    const response = await fetch(`${API_URL}/api-platform/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    return response.json();
  },

  // Change password (authenticated)
  changePassword: async (oldPassword, newPassword) => {
    const response = await fetch(`${API_URL}/api-platform/auth/change-password`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    return response.json();
  },
};

// ==================== EVENTS ====================

export const eventsApi = {
  // Create new event
  create: async (eventData) => {
    const response = await fetch(`${API_URL}/api-platform/events`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(eventData),
    });
    return response.json();
  },

  // List all events with pagination
  list: async (page = 1, limit = 10, status = "") => {
    const query = new URLSearchParams({ page, limit, status }).toString();
    const response = await fetch(`${API_URL}/api-platform/events?${query}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Get single event
  get: async (eventId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Update event
  update: async (eventId, eventData) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(eventData),
    });
    return response.json();
  },

  // Delete/Soft delete event
  delete: async (eventId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return response.json();
  },

  // Publish event
  publish: async (eventId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/publish`, {
      method: "POST",
      headers: getHeaders(),
    });
    return response.json();
  },
};

// ==================== FORMS ====================

export const formsApi = {
  // Create form for event
  create: async (eventId, formData) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/form`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(formData),
    });
    return response.json();
  },

  // Get form for event
  get: async (eventId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/form`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Update form
  update: async (eventId, formData) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/form`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(formData),
    });
    return response.json();
  },

  // Delete form
  delete: async (eventId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/form`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return response.json();
  },
};

// ==================== REGISTRATIONS ====================

export const registrationsApi = {
  // Public registration with API key
  register: async (eventId, registrationData, apiKey) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(registrationData),
    });
    return response.json();
  },

  // List registrations for event
  list: async (eventId, page = 1, limit = 50) => {
    const query = new URLSearchParams({ page, limit }).toString();
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/registrations?${query}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Get single registration
  get: async (eventId, registrationId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/registrations/${registrationId}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Mark attendance
  markAttendance: async (eventId, registrationId, attended = true) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/registrations/${registrationId}/attendance`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ attended }),
    });
    return response.json();
  },
};

// ==================== JUDGES ====================

export const judgesApi = {
  // Invite judge to event
  invite: async (eventId, judgeData) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/judges/invite`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(judgeData),
    });
    return response.json();
  },

  // List judges for event
  list: async (eventId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/judges`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Deactivate judge
  deactivate: async (eventId, judgeId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/judges/${judgeId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return response.json();
  },

  // Lock all scores for event
  lockScores: async (eventId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/scores/lock`, {
      method: "POST",
      headers: getHeaders(),
    });
    return response.json();
  },

  // Generate leaderboard
  generateLeaderboard: async (eventId) => {
    const response = await fetch(`${API_URL}/api-platform/events/${eventId}/leaderboard/generate`, {
      method: "POST",
      headers: getHeaders(),
    });
    return response.json();
  },
};

// ==================== JUDGE AUTH (Public) ====================

export const judgeAuthApi = {
  // Judge login
  login: async (email, password, eventId) => {
    const response = await fetch(`${API_URL}/api-platform/judge-auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, eventId }),
    });
    return response.json();
  },
};

// ==================== JUDGE PANEL ====================

export const judgePanelApi = {
  // List registrations to score
  getRegistrations: async () => {
    const token = localStorage.getItem("judgeToken");
    const response = await fetch(`${API_URL}/api-platform/judge/registrations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  // Submit score
  submitScore: async (scoreData) => {
    const token = localStorage.getItem("judgeToken");
    const response = await fetch(`${API_URL}/api-platform/judge/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(scoreData),
    });
    return response.json();
  },

  // Update score
  updateScore: async (scoreId, scoreData) => {
    const token = localStorage.getItem("judgeToken");
    const response = await fetch(`${API_URL}/api-platform/judge/scores/${scoreId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(scoreData),
    });
    return response.json();
  },

  // View leaderboard
  getLeaderboard: async () => {
    const token = localStorage.getItem("judgeToken");
    const response = await fetch(`${API_URL}/api-platform/judge/leaderboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};

// ==================== ANALYTICS ====================

export const analyticsApi = {
  // Get dashboard analytics
  getDashboard: async () => {
    const response = await fetch(`${API_URL}/api-platform/analytics/dashboard`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  // Get event overview
  getEventOverview: async (eventId) => {
    const response = await fetch(`${API_URL}/api-platform/analytics/events/${eventId}/overview`, {
      headers: getHeaders(),
    });
    return response.json();
  },
};

// ==================== SETTINGS ====================

export const settingsApi = {
  // Update platform user settings
  updateSettings: async (settings) => {
    const response = await fetch(`${API_URL}/api-platform/settings`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(settings),
    });
    return response.json();
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_URL}/api-platform/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(profileData),
    });
    return response.json();
  },
};

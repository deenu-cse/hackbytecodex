"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const ApiPlatformContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function ApiPlatformProvider({ children }) {
  const [platformUser, setPlatformUser] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [events, setEvents] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const platformToken = localStorage.getItem("platformToken");
      const storedApiKey = localStorage.getItem("platformApiKey");
      
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
      
      if (platformToken) {
        try {
          const response = await fetch(`${API_URL}/api-platform/auth/me`, {
            headers: {
              Authorization: `Bearer ${platformToken}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setPlatformUser(data.data);
            // Fetch subscription details
            await fetchSubscription(platformToken);
          } else {
            localStorage.removeItem("platformToken");
            localStorage.removeItem("platformApiKey");
          }
        } catch (err) {
          console.error("Platform auth init error:", err);
          localStorage.removeItem("platformToken");
          localStorage.removeItem("platformApiKey");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const fetchSubscription = async (token) => {
    try {
      const response = await fetch(`${API_URL}/api-platform/billing/subscription`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubscription(data.data);
      }
    } catch (err) {
      console.error("Fetch subscription error:", err);
    }
  };

  const login = async (platformIdOrEmail, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/api-platform/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          platformId: platformIdOrEmail.includes('@') ? undefined : platformIdOrEmail,
          email: platformIdOrEmail.includes('@') ? platformIdOrEmail : undefined,
          password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("platformToken", data.token);
      if (data.apiKey) {
        localStorage.setItem("platformApiKey", data.apiKey);
        setApiKey(data.apiKey);
      }
      setPlatformUser(data.user);
      await fetchSubscription(data.token);
      router.push("/api-platform/dashboard");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("platformToken");
    localStorage.removeItem("platformApiKey");
    setPlatformUser(null);
    setApiKey(null);
    setSubscription(null);
    setEvents([]);
    setAnalytics(null);
    router.push("/platform-login");
  };

  const rotateApiKey = async () => {
    const token = localStorage.getItem("platformToken");
    if (!token) return { success: false, error: "Not authenticated" };

    try {
      const response = await fetch(`${API_URL}/api-platform/billing/rotate-key`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to rotate key");
      }

      localStorage.setItem("platformApiKey", data.apiKey);
      setApiKey(data.apiKey);
      return { success: true, apiKey: data.apiKey };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateApiKeySettings = async (settings) => {
    const token = localStorage.getItem("platformToken");
    if (!token) return { success: false, error: "Platform authentication required" };

    try {
      const response = await fetch(`${API_URL}/api-platform/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update API key settings");
      }

      // Update local state if needed
      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const getApiKeySettings = async () => {
    const token = localStorage.getItem("platformToken");
    if (!token) return { success: false, error: "Platform authentication required" };

    try {
      const response = await fetch(`${API_URL}/api-platform/settings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch API key settings");
      }

      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchEvents = useCallback(async () => {
    const token = localStorage.getItem("platformToken");
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api-platform/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.data || []);
      }
    } catch (err) {
      console.error("Fetch events error:", err);
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    const token = localStorage.getItem("platformToken");
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api-platform/analytics/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.data);
      }
    } catch (err) {
      console.error("Fetch analytics error:", err);
    }
  }, []);

  const createOrder = async (plan, billingCycle) => {
    const token = localStorage.getItem("codexToken"); 
    if (!token) return { success: false, error: "User authentication required" };

    try {
      const response = await fetch(`${API_URL}/api-platform/billing/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan, billingCycle }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    const token = localStorage.getItem("codexToken"); // User token, not platform token
    if (!token) return { success: false, error: "User authentication required" };

    try {
      const response = await fetch(`${API_URL}/api-platform/billing/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment verification failed");
      }

      // Update the platform user data with the new API key and subscription
      if (data.data.apiKey) {
        localStorage.setItem("platformApiKey", data.data.apiKey);
        setApiKey(data.data.apiKey);
      }

      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const cancelSubscription = async () => {
    const platformToken = localStorage.getItem("platformToken");
    if (!platformToken) return { success: false, error: "Platform authentication required" };

    try {
      const response = await fetch(`${API_URL}/api-platform/billing/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${platformToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel subscription");
      }

      setSubscription(data.data);

      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("platformToken");
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  const value = {
    // State
    platformUser,
    apiKey,
    subscription,
    events,
    analytics,
    loading,
    error,
    
    // Auth actions
    login,
    logout,
    
    // API Key management
    rotateApiKey,
    
    // API Key settings
    updateApiKeySettings,
    getApiKeySettings,
    
    // Billing actions
    createOrder,
    verifyPayment,
    cancelSubscription,
    
    // Data fetching
    fetchEvents,
    fetchAnalytics,
    fetchSubscription,
    
    // Helpers
    getAuthHeaders,
    API_URL,
    
    // Computed
    isAuthenticated: !!platformUser,
    isBasic: subscription?.plan === "BASIC",
    isPro: subscription?.plan === "PRO",
    isEnterprise: subscription?.plan === "ENTERPRISE",
  };

  return (
    <ApiPlatformContext.Provider value={value}>
      {children}
    </ApiPlatformContext.Provider>
  );
}

export const useApiPlatform = () => {
  const context = useContext(ApiPlatformContext);
  if (!context) {
    throw new Error("useApiPlatform must be used within ApiPlatformProvider");
  }
  return context;
};

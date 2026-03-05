"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";
import { Button } from "@/components/ui/button";
import { Key, Copy, Check, RefreshCw, Eye, EyeOff, AlertTriangle, Plus, Trash2 } from "lucide-react";

export default function KeysPage() {
  const { apiKey, rotateApiKey, subscription, getApiKeySettings, updateApiKeySettings } = useApiPlatform();
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [showRotateConfirm, setShowRotateConfirm] = useState(false);
  const [ipAddresses, setIpAddresses] = useState([]);
  const [newIpAddress, setNewIpAddress] = useState("");
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoadingSettings(true);
    try {
      const response = await getApiKeySettings();
      if (response.success) {
        setIpAddresses(response.data.allowedOrigins || []);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRotate = async () => {
    setRotating(true);
    await rotateApiKey();
    setRotating(false);
    setShowRotateConfirm(false);
  };

  const handleAddIp = () => {
    if (newIpAddress.trim() && !ipAddresses.includes(newIpAddress.trim())) {
      setIpAddresses([...ipAddresses, newIpAddress.trim()]);
      setNewIpAddress("");
    }
  };

  const handleRemoveIp = (ip) => {
    setIpAddresses(ipAddresses.filter(addr => addr !== ip));
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const response = await updateApiKeySettings({
        settings: {
          allowedOrigins: ipAddresses
        }
      });
      
      if (response.success) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings: " + response.error);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings");
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">API Keys</h1>
        <p className="text-gray-400 mt-1">Manage your API keys for accessing the platform</p>
      </div>

      {/* Current Key */}
      <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Current API Key</h2>
            <p className="text-sm text-gray-500">Use this key to authenticate API requests</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-black border border-white/10">
          <code className="flex-1 text-sm font-mono text-gray-300">
            {showKey ? apiKey : apiKey ? `${apiKey.slice(0, 20)}••••••••••••••••` : "No API key"}
          </code>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => setShowRotateConfirm(true)}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Rotate Key
          </Button>
        </div>
      </div>

      {/* IP Whitelisting Section */}
      <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">IP Whitelisting</h2>
            <p className="text-sm text-gray-500">Restrict API access to specific IP addresses</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newIpAddress}
              onChange={(e) => setNewIpAddress(e.target.value)}
              placeholder="Enter IP address (e.g., 192.168.1.1)"
              className="flex-1 px-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAddIp()}
            />
            <Button 
              onClick={handleAddIp}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {ipAddresses.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400">Whitelisted IPs:</h3>
              <div className="space-y-2">
                {ipAddresses.map((ip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-black border border-white/10">
                    <span className="text-gray-300">{ip}</span>
                    <button
                      onClick={() => handleRemoveIp(ip)}
                      className="p-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button
              onClick={handleSaveSettings}
              disabled={savingSettings}
              className="bg-green-600 hover:bg-green-700"
            >
              {savingSettings ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <p className="text-sm text-gray-500 mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-white">{subscription?.usage?.totalRequests || 0}</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <p className="text-sm text-gray-500 mb-1">Last Used</p>
          <p className="text-2xl font-bold text-white">{subscription?.apiKey?.lastUsedAt ? new Date(subscription.apiKey.lastUsedAt).toLocaleDateString() : "Never"}</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <p className="text-sm text-gray-500 mb-1">Created</p>
          <p className="text-2xl font-bold text-white">{subscription?.createdAt ? new Date(subscription.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
      </div>

      {/* Rotate Confirmation Modal */}
      {showRotateConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full p-6 rounded-2xl bg-[#0a0a0a] border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Rotate API Key?</h3>
            </div>
            <p className="text-gray-400 mb-6">
              This will invalidate your current API key and generate a new one. 
              Any applications using the old key will stop working immediately.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowRotateConfirm(false)}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRotate}
                disabled={rotating}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {rotating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  "Rotate Key"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

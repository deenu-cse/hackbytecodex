"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save, UserPlus, Shield, Users, Check, X } from "lucide-react";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";

export default function SettingsPage() {
  const { getAuthHeaders, API_URL, getApiKeySettings, updateApiKeySettings } = useApiPlatform();
  const [settings, setSettings] = useState({
    webhookUrl: "",
    allowedOrigins: [],
    notifyOnRegistration: true
  });
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general"); // general, users, roles

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // Load platform settings
      const settingsResponse = await getApiKeySettings();
      if (settingsResponse.success) {
        setSettings({
          webhookUrl: settingsResponse.data.webhookUrl || "",
          allowedOrigins: settingsResponse.data.allowedOrigins || [],
          notifyOnRegistration: settingsResponse.data.notifyOnRegistration ?? true
        });
      }

      // Load users (this would be from your user management API)
      // Mock data for now
      setUsers([
        { id: 1, name: "John Doe", email: "john@example.com", role: "ADMIN", status: "ACTIVE" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "MODERATOR", status: "ACTIVE" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "MEMBER", status: "INACTIVE" }
      ]);

      // Load roles (this would be from your role management API)
      // Mock data for now
      setRoles([
        { id: "ADMIN", name: "Administrator", permissions: ["ALL_ACCESS"] },
        { id: "MODERATOR", name: "Moderator", permissions: ["MANAGE_EVENTS", "VIEW_ANALYTICS"] },
        { id: "MEMBER", name: "Member", permissions: ["CREATE_EVENTS"] }
      ]);
    } catch (err) {
      console.error("Error loading settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleOriginChange = (index, value) => {
    const newOrigins = [...settings.allowedOrigins];
    newOrigins[index] = value;
    setSettings(prev => ({ ...prev, allowedOrigins: newOrigins }));
  };

  const addOrigin = () => {
    setSettings(prev => ({ ...prev, allowedOrigins: [...prev.allowedOrigins, ""] }));
  };

  const removeOrigin = (index) => {
    const newOrigins = settings.allowedOrigins.filter((_, i) => i !== index);
    setSettings(prev => ({ ...prev, allowedOrigins: newOrigins }));
  };

  const handleSave = async () => {
    try {
      const response = await updateApiKeySettings({
        settings: {
          webhookUrl: settings.webhookUrl,
          allowedOrigins: settings.allowedOrigins.filter(origin => origin.trim() !== ""),
          notifyOnRegistration: settings.notifyOnRegistration
        }
      });

      if (response.success) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings: " + response.error);
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving settings");
    }
  };

  const handleRoleAssignment = async (userId, roleId) => {
    // This would be an API call to assign a role to a user
    console.log(`Assigning role ${roleId} to user ${userId}`);
    alert(`Role assigned to user`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your platform preferences and permissions</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 font-medium ${
            activeTab === "general"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          General Settings
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 font-medium ${
            activeTab === "users"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`px-4 py-2 font-medium ${
            activeTab === "roles"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Roles & Permissions
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "general" && (
        <div className="max-w-2xl p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">General Settings</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="webhook" className="text-gray-300">Webhook URL</Label>
              <Input
                id="webhook"
                value={settings.webhookUrl}
                onChange={(e) => handleSettingChange("webhookUrl", e.target.value)}
                placeholder="https://your-domain.com/webhook"
                className="h-12 bg-black border-white/20 text-white placeholder:text-gray-600"
              />
              <p className="text-sm text-gray-500">Receive real-time event notifications</p>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Allowed Origins (CORS)</Label>
              <div className="space-y-2">
                {settings.allowedOrigins.map((origin, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={origin}
                      onChange={(e) => handleOriginChange(index, e.target.value)}
                      placeholder="https://your-domain.com"
                      className="flex-1 bg-black border-white/20 text-white placeholder:text-gray-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeOrigin(index)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOrigin}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Origin
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notifyOnRegistration"
                  checked={settings.notifyOnRegistration}
                  onChange={(e) => handleSettingChange("notifyOnRegistration", e.target.checked)}
                  className="rounded border-white/20 text-blue-500 focus:ring-blue-500"
                />
                <Label htmlFor="notifyOnRegistration" className="text-gray-300">
                  Notify on new registrations
                </Label>
              </div>
              <p className="text-sm text-gray-500">Receive email notifications when someone registers for your events</p>
            </div>

            <div className="pt-4">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">User Management</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-medium text-gray-400 border-b border-white/10 pb-2">
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Action</div>
            </div>
            {users.map(user => (
              <div key={user.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-400">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-white">{user.name}</span>
                </div>
                <div className="text-gray-300">{user.email}</div>
                <div>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleAssignment(user.id, e.target.value)}
                    className="px-3 py-1 rounded-lg bg-black border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "ACTIVE" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "roles" && (
        <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Roles & Permissions</h2>
          </div>

          <div className="space-y-6">
            {roles.map(role => (
              <div key={role.id} className="p-6 rounded-xl bg-black border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                  <span className="text-sm text-gray-400">{role.permissions.length} permissions</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Permissions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

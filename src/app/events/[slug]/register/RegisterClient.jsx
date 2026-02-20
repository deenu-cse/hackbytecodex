
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CreditCard,
  User,
  Mail,
  Phone,
  Github,
  Linkedin,
  FileText,
  ChevronRight,
  Shield,
  Lock,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  Users,
  Trophy,
  Building2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

const typeConfig = {
  HACKATHON: {
    color: "from-purple-500 to-indigo-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    gradient: "from-purple-500/20 via-transparent to-transparent",
  },
  WORKSHOP: {
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400",
    gradient: "from-green-500/20 via-transparent to-transparent",
  },
  SEMINAR: {
    color: "from-yellow-500 to-orange-600",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-400",
    gradient: "from-yellow-500/20 via-transparent to-transparent",
  },
  COMPETITION: {
    color: "from-red-500 to-rose-600",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    gradient: "from-red-500/20 via-transparent to-transparent",
  },
};

const fieldIcons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  phone: Phone,
  resume: FileText,
  default: User,
};

const modeIcons = {
  ONLINE: Globe,
  OFFLINE: MapPin,
  HYBRID: Building2,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

export function RegisterClient({ event: initialEvent, formFields: initialFormFields, isClosed: initialIsClosed, slug }) {
  const { user } = useAuth();

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});

  const [event, setEvent] = useState(initialEvent);
  const [formFields, setFormFields] = useState(initialFormFields);
  const [isClosed, setIsClosed] = useState(initialIsClosed);

  const config = typeConfig[event?.eventType] || typeConfig.COMPETITION;
  const totalSteps = event?.registration?.fee > 0 ? 3 : 2;

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.fullName,
        email: user.email,
        phone: user.phone
      }))
    }
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);

        const eventRes = await fetch(`${API_URL}/user/events/${slug}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!eventRes.ok) {
          if (eventRes.status === 404) {
            setError("Event not found");
            return;
          }
          throw new Error("Failed to fetch event");
        }

        const eventData = await eventRes.json();

        if (!eventData.success) {
          setError(eventData.message || "Failed to load event");
          return;
        }

        setEvent(eventData.data);

        const closed = !eventData.data.registration?.isOpen ||
          (eventData.data.registration?.limit && eventData.data.participantsCount >= eventData.data.registration.limit);
        setIsClosed(closed);

        const formRes = await fetch(`${API_URL}/user/events/form/${slug}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (formRes.ok) {
          const formData = await formRes.json();
          if (formData.success && formData.data) {
            setFormFields(formData.data.fields || []);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load registration data. Please try again.");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleFileChange = (name, file) => {
    if (file) {
      setFiles((prev) => ({ ...prev, [name]: file }));
      setFormData((prev) => ({ ...prev, [name]: file.name }));
    }
  };

  const validateStep = () => {
    if (step === 1) {
      const requiredFields = formFields.filter((f) => f.required);
      for (const field of requiredFields) {
        if (!formData[field.name]) {
          setError(`${field.label} is required`);
          return false;
        }
      }

      if (formFields.length === 0) {
        if (!formData.name?.trim()) {
          setError("Full Name is required");
          return false;
        }
        if (!formData.email?.trim()) {
          setError("Email is required");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("Please enter a valid email address");
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setError("");
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem('codexToken')
      if (!token) {
        router.push(`/login?redirect=/events/${slug}/register`);
        return;
      }

      const submitData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'file') {
          submitData.append(key, value);
        }
      });

      Object.entries(files).forEach(([key, file]) => {
        submitData.append(key, file);
      });

      const res = await fetch(`${API_URL}/user/events/register/${slug}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: submitData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push(`/login?redirect=/events/${slug}/register`);
          return;
        }
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(true);

      setTimeout(() => {
        router.push(`/events/${slug}?registered=true`);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading state
  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-gray-400 animate-pulse">Loading registration form...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Error Loading Event</h1>
          <p className="text-gray-400">{error}</p>
          <Link href="/events">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Events
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (isClosed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Registration Closed</h1>
          <p className="text-gray-400">
            Sorry, registrations for this event are currently closed or the event is full.
          </p>
          <Link href={`/events/${slug}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Event
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-24 h-24 mx-auto rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20"
          >
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Registration Successful!</h1>
          <p className="text-gray-400">
            You've successfully registered for {event.title}. Check your email for confirmation details.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href={`/events/${slug}`}>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-blue-600 rounded-xl cursor-pointe">
                View Event
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const ModeIcon = modeIcons[event.mode] || MapPin;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b ${config.gradient} opacity-30 blur-[120px] pointer-events-none`} />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/events/${slug}`}>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Event
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Secure Registration</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Event Summary */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 space-y-6"
            >
              {/* Event Card */}
              <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 relative">
                  {event.banners?.[0] && (
                    <img
                      src={event.banners[0].url}
                      alt={event.title}
                      className="w-full h-full object-cover opacity-50"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                  <Badge className={`absolute top-4 left-4 ${config.bg} ${config.text} ${config.border} border`}>
                    {event.eventType}
                  </Badge>
                </div>
                <div className="p-6 -mt-12 relative">
                  <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
                  <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {event.college?.collegeName}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">
                        {formatTime(event.startDate)} - {formatTime(event.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <ModeIcon className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{event.location.name || event.mode}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{event.participantsCount} registered</span>
                      {event.registration?.limit && (
                        <span className="text-white/40">/ {event.registration.limit} limit</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fee Summary */}
              <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6">
                <h3 className="font-semibold mb-4">Registration Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Entry Fee</span>
                    <span className="text-white">
                      {event.registration?.fee > 0 ? `₹${event.registration.fee}` : "Free"}
                    </span>
                  </div>
                  {event.rewardPoints?.participant > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Reward Points</span>
                      <span className="text-yellow-400">+{event.rewardPoints.participant} pts</span>
                    </div>
                  )}
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-white">
                      {event.registration?.fee > 0 ? `₹${event.registration.fee}` : "Free"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Instant Confirmation</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Registration Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 md:p-8"
            >
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {[...Array(totalSteps)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <motion.div
                        initial={false}
                        animate={{
                          backgroundColor: step > i ? "#3b82f6" : step === i + 1 ? "#1e40af" : "#1f2937",
                          scale: step === i + 1 ? 1.1 : 1,
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${step > i ? "bg-blue-600 text-white" : step === i + 1 ? "bg-blue-600/20 text-blue-400 border-2 border-blue-600" : "bg-white/5 text-gray-500"
                          }`}
                      >
                        {step > i ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                      </motion.div>
                      {i < totalSteps - 1 && (
                        <div className={`w-full h-1 mx-2 rounded-full ${step > i + 1 ? "bg-blue-600" : "bg-white/10"}`} style={{ width: "60px" }} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Details</span>
                  {event.registration?.fee > 0 && <span>Payment</span>}
                  <span>Confirm</span>
                </div>
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 1: Personal Details */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Enter Your Details</h3>
                      <p className="text-gray-400">Please fill in your information to register for this event.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Dynamic Form Fields */}
                      {formFields.map((field, index) => {
                        const Icon = fieldIcons[field.name.toLowerCase()] || fieldIcons.default;

                        return (
                          <motion.div
                            key={field.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={field.type === "TEXTAREA" || field.type === "FILE" ? "md:col-span-2" : ""}
                          >
                            <Label className="text-gray-300 mb-2 block">
                              {field.label}
                              {field.required && <span className="text-red-400 ml-1">*</span>}
                            </Label>

                            {field.type === "SELECT" ? (
                              <Select
                                value={formData[field.name] || ""}
                                onValueChange={(value) => handleInputChange(field.name, value)}
                              >
                                <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl h-12">
                                  <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0f0f0f] border-white/10 text-white">
                                  {field.options?.map((option) => (
                                    <SelectItem key={option} value={option} className="focus:bg-white/10">
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : field.type === "TEXTAREA" ? (
                              <Textarea
                                placeholder={field.placeholder}
                                value={formData[field.name] || ""}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className="bg-white/5 border-white/10 text-white rounded-xl min-h-[120px] resize-none focus:border-blue-500/50"
                              />
                            ) : field.type === "FILE" ? (
                              <div className="relative">
                                <Input
                                  type="file"
                                  onChange={(e) => handleFileChange(field.name, e.target.files?.[0])}
                                  className="bg-white/5 border-white/10 text-white rounded-xl h-12 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />
                                {files[field.name] && (
                                  <p className="mt-2 text-sm text-green-400 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    {files[field.name].name}
                                  </p>
                                )}
                              </div>
                            ) : field.type === "CHECKBOX" ? (
                              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                <Checkbox
                                  id={field.name}
                                  checked={formData[field.name] || false}
                                  onCheckedChange={(checked) => handleInputChange(field.name, checked)}
                                  className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label htmlFor={field.name} className="text-gray-300 cursor-pointer">
                                  {field.placeholder || field.label}
                                </Label>
                              </div>
                            ) : (
                              <div className="relative">
                                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <Input
                                  type={field.type === "NUMBER" ? "number" : field.type === "EMAIL" ? "email" : "text"}
                                  placeholder={field.placeholder}
                                  value={formData[field.name] || ""}
                                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  className="bg-white/5 border-white/10 text-white rounded-xl h-12 pl-10 focus:border-blue-500/50 focus:ring-blue-500/20"
                                />
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Default fields if no custom form */}
                    {formFields.length === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <Label className="text-gray-300 mb-2 block">Full Name <span className="text-red-400">*</span></Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <Input
                              placeholder="John Doe"
                              value={formData.name || ""}
                              disabled
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              className="bg-white/5 border-white/10 text-white rounded-xl h-12 pl-10"
                            />
                          </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                          <Label className="text-gray-300 mb-2 block">Email <span className="text-red-400">*</span></Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email || ""}
                              disabled
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="bg-white/5 border-white/10 text-white rounded-xl h-12 pl-10"
                            />
                          </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2">
                          <Label className="text-gray-300 mb-2 block">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <Input
                              placeholder="+91 98765 43210"
                              value={formData.phone || ""}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="bg-white/5 border-white/10 text-white rounded-xl h-12 pl-10"
                            />
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Payment (if applicable) */}
                {step === 2 && event.registration?.fee > 0 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Payment</h3>
                      <p className="text-gray-400">Complete your registration by paying the entry fee.</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-gray-300">Amount to Pay</span>
                        <span className="text-3xl font-bold text-white">₹{event.registration.fee}</span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-blue-500/30 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-white">Pay with UPI</p>
                              <p className="text-sm text-gray-400">Google Pay, PhonePe, Paytm</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-500/20" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-blue-500/30 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-white">Credit/Debit Card</p>
                              <p className="text-sm text-gray-400">Visa, Mastercard, RuPay</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-sm text-yellow-400 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          You'll receive {event.rewardPoints?.participant || 0} reward points after registration
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 (or 2 if free): Confirmation */}
                {step === (event.registration?.fee > 0 ? 3 : 2) && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Confirm Registration</h3>
                      <p className="text-gray-400">Review your details before submitting.</p>
                    </div>

                    <div className="space-y-4 bg-white/5 rounded-2xl p-6 border border-white/10">
                      {Object.entries(formData).map(([key, value]) => (
                        value && (
                          <div key={key} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                            <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-white font-medium truncate max-w-[200px]">
                              {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                            </span>
                          </div>
                        )
                      ))}
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-300">
                        By registering, you agree to the event terms and conditions. You'll receive a confirmation email with further instructions.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1 || loading}
                  className="border-white/10 hover:bg-white/5 text-blue-600 rounded-xl disabled:opacity-50 cursor-pointer"
                >
                  Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white rounded-xl px-8 cursor-pointer`}
                  >
                    Continue
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white rounded-xl px-8 h-12`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <CheckCircle2 className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
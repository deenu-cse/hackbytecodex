"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
  Search,
  GraduationCap,
  XCircle,
  CheckCircle,
  ChevronDown,
  X,
  Info,
  Lightbulb,
  AlertTriangle,
  FileCheck,
  ScrollText,
  BookOpen,
  HelpCircle,
  ArrowUpRight,
  Send
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
  full_name: User,
  email_address: Mail,
  phone_number: Phone,
  college_institue: GraduationCap,
  github: Github,
  linkedin: Linkedin,
  resume: FileText,
  default: User,
};

const modeIcons = {
  ONLINE: Globe,
  OFFLINE: MapPin,
  HYBRID: Building2,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

// Smart Instructions Component
function SmartInstructions({ instructions, config }) {
  const [expanded, setExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  if (!instructions || instructions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden"
    >
      <div 
        className={`p-4 bg-gradient-to-r ${config.gradient} border-b border-white/5 cursor-pointer`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
              <ScrollText className={`w-5 h-5 ${config.text}`} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Instructions & Guidelines</h3>
              <p className="text-xs text-gray-400">{instructions.length} section{instructions.length > 1 ? 's' : ''} to review</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="divide-y divide-white/5"
          >
            {instructions.map((section, index) => (
              <motion.div
                key={section._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <span className={`text-sm font-bold ${config.text}`}>{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                          {section.heading}
                        </h4>
                        {section.points?.length > 0 && (
                          <Badge variant="outline" className="text-xs border-white/10 text-gray-400">
                            {section.points.length} point{section.points.length > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {activeIndex !== index && section.points?.length > 0 && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-sm text-gray-500 line-clamp-1"
                          >
                            {section.points[0]}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 90 : 0 }}
                      className="text-gray-500"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {activeIndex === index && section.points?.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 ml-11 space-y-2"
                      >
                        {section.points.map((point, pointIndex) => (
                          <motion.div
                            key={pointIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: pointIndex * 0.05 }}
                            className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-colors"
                          >
                            <div className={`w-5 h-5 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <CheckCircle2 className={`w-3 h-3 ${config.text}`} />
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{point}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <span>Read all instructions carefully before submitting your registration</span>
        </div>
      </div>
    </motion.div>
  );
}

function CollegeDropdown({ value, onChange, error, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/auth/colleges?search=${search}&limit=20`);
        if (res.ok) {
          const data = await res.json();
          setColleges(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch colleges");
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchColleges, 300);
    return () => clearTimeout(timeout);
  }, [search, isOpen]);

  const filteredColleges = colleges.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.address?.city?.toLowerCase().includes(search.toLowerCase()) ||
    c.address?.state?.toLowerCase().includes(search.toLowerCase())
  );

  const submitRequest = async () => {
    if (!requestName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/auth/colleges/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeName: requestName }),
      });
      if (res.ok) {
        setRequestSubmitted(true);
        setTimeout(() => {
          setShowRequest(false);
          setRequestSubmitted(false);
          setRequestName("");
        }, 3000);
      }
    } catch (err) {
      console.error("Failed to submit request");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full h-12 px-4 rounded-xl bg-white/5 border text-left flex items-center justify-between transition-all ${
          value ? "border-blue-500/50 text-white" : "border-white/10 text-gray-500"
        } ${error ? "border-red-500/50" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span className={value ? "text-white" : "text-gray-500"}>
          {value ? value.name : "Search your college..."}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-80"
          >
            <div className="p-3 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search colleges..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-10 bg-white/5 border-white/10 text-white text-sm rounded-lg"
                  autoFocus
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-60">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                  Searching...
                </div>
              ) : filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <button
                    key={college._id}
                    type="button"
                    onClick={() => {
                      onChange(college);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white/5">
                      {college.logo?.url ? (
                        <img src={college.logo.url} alt={college.name} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{college.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {college.address?.city ? `${college.address.city}, ${college.address.state || 'India'}` : "India"}
                      </p>
                    </div>
                    {value?._id === college._id && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center">
                  <p className="text-gray-500 mb-3">No colleges found</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setShowRequest(true);
                      setRequestName(search);
                    }}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 mx-auto"
                  >
                    <Send className="w-4 h-4" />
                    Request to add your college
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request College Modal */}
      <AnimatePresence>
        {showRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 relative"
            >
              <button
                onClick={() => setShowRequest(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {!requestSubmitted ? (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Request New College</h3>
                  <p className="text-gray-400 text-center text-sm mb-6">
                    Can't find your college? Submit a request and we'll add it within 24 hours.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">College Name</label>
                      <Input
                        value={requestName}
                        onChange={(e) => setRequestName(e.target.value)}
                        placeholder="e.g., Delhi Technological University"
                        className="h-12 bg-white/5 border-white/10 text-white rounded-xl"
                      />
                    </div>

                    <Button
                      onClick={submitRequest}
                      disabled={!requestName.trim()}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
                  <p className="text-gray-400 text-sm">
                    We'll review and add your college soon. Check back in 24 hours!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RegisterClient({ event: initialEvent, formFields: initialFormFields, isClosed: initialIsClosed, slug }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);

  const [event, setEvent] = useState(initialEvent);
  const [formFields, setFormFields] = useState(initialFormFields || []);
  const [instructions, setInstructions] = useState([]);
  const [isClosed, setIsClosed] = useState(initialIsClosed);

  const config = typeConfig[event?.eventType] || typeConfig.COMPETITION;

  // FIX: Check if email field exists in formFields with null check
  const hasEmailField = useMemo(() => {
    if (!formFields || !Array.isArray(formFields) || formFields.length === 0) {
      return false;
    }
    return formFields.some(field => 
      field?.type === "EMAIL" || 
      (field?.name && field.name.toLowerCase().includes('email'))
    );
  }, [formFields]);

  const hasInstructions = instructions && instructions.length > 0;
  const hasPayment = event?.registration?.fee > 0;
  
  // Calculate steps: Instructions (optional) + Form + Payment (optional) + Confirm
  const totalSteps = (hasInstructions ? 1 : 0) + 1 + (hasPayment ? 1 : 0) + 1;

  const getStepInfo = () => {
    let currentStepType = '';
    
    if (hasInstructions) {
      if (step === 1) currentStepType = 'instructions';
      else if (step === 2) currentStepType = 'form';
      else if (hasPayment && step === 3) currentStepType = 'payment';
      else if ((hasPayment && step === 4) || (!hasPayment && step === 3)) currentStepType = 'confirm';
    } else {
      if (step === 1) currentStepType = 'form';
      else if (hasPayment && step === 2) currentStepType = 'payment';
      else if ((hasPayment && step === 3) || (!hasPayment && step === 2)) currentStepType = 'confirm';
    }
    
    return { currentStepType };
  };

  const { currentStepType } = getStepInfo();

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('codexToken');
    if (token) {
      fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFormData(prev => ({
            ...prev,
            full_name: data.data.fullName,
            email_address: data.data.email,
            phone_number: data.data.phone || ''
          }));
        }
      })
      .catch(() => {
        localStorage.removeItem('codexToken');
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);

        const eventRes = await fetch(`${API_URL}/user/events/${slug}`, {
          headers: { 'Content-Type': 'application/json' },
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
          headers: { 'Content-Type': 'application/json' },
        });

        if (formRes.ok) {
          const formDataRes = await formRes.json();
          if (formDataRes.success && formDataRes.data) {
            setFormFields(formDataRes.data.fields || []);
            setInstructions(formDataRes.data.instructions || []);
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
    if (currentStepType === 'form') {
      // Check hardcoded email if no email field in form
      if (!hasEmailField) {
        const emailValue = formData['email'] || formData['email_address'];
        if (!emailValue?.trim()) {
          setError("Email is required");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
          setError("Please enter a valid email address");
          return false;
        }
      }

      // Check all required fields from formFields
      const requiredFields = formFields.filter((f) => f.required);
      for (const field of requiredFields) {
        const value = formData[field.name];
        if (!value || (typeof value === 'string' && !value.trim())) {
          setError(`${field.label} is required`);
          return false;
        }
        
        if (field.type === "EMAIL" && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            setError(`Please enter a valid email address for ${field.label}`);
            return false;
          }
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
      const submitData = new FormData();

      // Map form field names to backend expected names
      const fieldMapping = {
        'email_address': 'email',
        'full_name': 'name',
        'phone_number': 'phone'
      };

      // Add all form data with proper field name mapping
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const mappedKey = fieldMapping[key] || key;
          
          if (typeof value === 'object' && value?._id) {
            submitData.append(mappedKey, value._id);
          } else {
            submitData.append(mappedKey, value);
          }
        }
      });

      // Add files
      Object.entries(files).forEach(([key, file]) => {
        submitData.append(key, file);
      });

      const res = await fetch(`${API_URL}/user/events/register/${slug}`, {
        method: "POST",
        body: submitData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.data?.token) {
        localStorage.setItem('codexToken', data.data.token);
        setIsNewUser(data.data.isNewUser);
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
          
          {isNewUser && (
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-400 font-medium mb-2">🎉 Welcome to HackByteCodex!</p>
              <p className="text-sm text-gray-400">
                We've created an account for you. Check your email for login credentials.
              </p>
            </div>
          )}
          
          <p className="text-gray-400">
            You've successfully registered for {event.title}. Check your email for confirmation details.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href={`/events/${slug}`}>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-blue-600 rounded-xl">
                View Event
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const ModeIcon = modeIcons[event.mode] || MapPin;

  const getStepLabels = () => {
    const labels = [];
    if (hasInstructions) labels.push('Instructions');
    labels.push('Details');
    if (hasPayment) labels.push('Payment');
    labels.push('Confirm');
    return labels;
  };

  const stepLabels = getStepLabels();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b ${config.gradient} opacity-30 blur-[120px] pointer-events-none`} />

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
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 space-y-6"
            >
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
                      <span className="text-gray-300">{event.location?.name || event.mode}</span>
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

              {/* <SmartInstructions instructions={instructions} config={config} /> */}

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
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                          step > i ? "bg-blue-600 text-white" : 
                          step === i + 1 ? "bg-blue-600/20 text-blue-400 border-2 border-blue-600" : 
                          "bg-white/5 text-gray-500"
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
                <div className="flex justify-between text-sm text-gray-400 px-2">
                  {stepLabels.map((label, i) => (
                    <span key={i} className={step === i + 1 ? "text-blue-400" : ""}>
                      {label}
                    </span>
                  ))}
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

              <AnimatePresence mode="wait">
                {/* STEP 1: Instructions */}
                {currentStepType === 'instructions' && (
                  <motion.div
                    key="instructions"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Before You Begin</h3>
                      <p className="text-gray-400">Please review the following instructions and guidelines carefully.</p>
                    </div>

                    <SmartInstructions instructions={instructions} config={config} />
                  </motion.div>
                )}

                {/* STEP 2: Form Fields */}
                {currentStepType === 'form' && (
                  <motion.div
                    key="form"
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
                      {/* Hardcoded Email Field */}
                      {!hasEmailField && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="md:col-span-2"
                        >
                          <Label className="text-gray-300 mb-2 block">
                            Email Address <span className="text-red-400">*</span>
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              value={formData['email'] || ""}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="bg-white/5 border-white/10 text-white rounded-xl h-12 pl-10 focus:border-blue-500/50"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            This email will be used for your account and confirmations
                          </p>
                        </motion.div>
                      )}

                      {/* Dynamic Form Fields */}
                      {formFields.map((field, index) => {
                        const Icon = fieldIcons[field.name?.toLowerCase()] || fieldIcons.default;

                        return (
                          <motion.div
                            key={field.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={field.type === "TEXTAREA" || field.type === "FILE" || field.type === "SELECT" ? "md:col-span-2" : ""}
                          >
                            <Label className="text-gray-300 mb-2 block">
                              {field.label}
                              {field.required && <span className="text-red-400 ml-1">*</span>}
                            </Label>

                            {field.type === "SELECT" && field.name?.toLowerCase().includes('college') ? (
                              <CollegeDropdown
                                value={formData[field.name] || null}
                                onChange={(value) => handleInputChange(field.name, value)}
                                error={error && !formData[field.name] && field.required}
                              />
                            ) : field.type === "SELECT" ? (
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

                    {formFields.length === 0 && !hasEmailField && (
                      <div className="text-center py-8 text-gray-500">
                        <Info className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No form fields configured for this event.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Payment Step */}
                {currentStepType === 'payment' && (
                  <motion.div
                    key="payment"
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

                {/* Confirmation Step */}
                {currentStepType === 'confirm' && (
                  <motion.div
                    key="confirm"
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
                      {!hasEmailField && formData['email'] && (
                        <div className="flex justify-between py-2 border-b border-white/5">
                          <span className="text-gray-400">Email</span>
                          <span className="text-white font-medium truncate max-w-[200px]">
                            {formData['email']}
                          </span>
                        </div>
                      )}
                      
                      {formFields.map((field) => {
                        const value = formData[field.name];
                        if (!value && value !== false) return null;
                        
                        return (
                          <div key={field.name} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                            <span className="text-gray-400">{field.label}</span>
                            <span className="text-white font-medium truncate max-w-[200px]">
                              {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 
                               typeof value === 'object' ? value.name : value}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-300">
                        By registering, you agree to the event terms and conditions. You'll receive a confirmation email with further instructions.
                        {formData['email'] && !localStorage.getItem('codexToken') && (
                          <span className="block mt-2 text-blue-400">
                            A new account will be created for you automatically!
                          </span>
                        )}
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
                  className="border-white/10 hover:bg-white/5 text-blue-600 rounded-xl disabled:opacity-50"
                >
                  Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white rounded-xl px-8`}
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
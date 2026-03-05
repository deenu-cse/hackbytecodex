"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Hash, MapPin, Users, Clock, Image as ImageIcon, Link as LinkIcon, Plus, Minus, Trash2 } from "lucide-react";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const { getAuthHeaders, API_URL } = useApiPlatform();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    startDate: "",
    endDate: "",
    registrationStartDate: "",
    registrationEndDate: "",
    maxParticipants: "",
    location: "",
    bannerImage: "",
    website: "",
    tags: [""],
    formFields: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Form Fields, 3: Preview
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === "title" && !formData.slug) {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  };
  
  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };
  
  const addTag = () => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, ""] }));
  };
  
  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, tags: newTags }));
  };
  
  const addFormField = () => {
    setFormData(prev => ({
      ...prev,
      formFields: [
        ...prev.formFields,
        {
          id: Date.now(),
          name: "",
          type: "TEXT",
          required: false,
          options: [],
          placeholder: ""
        }
      ]
    }));
  };
  
  const updateFormField = (index, field, value) => {
    const newFields = [...formData.formFields];
    newFields[index][field] = value;
    setFormData(prev => ({ ...prev, formFields: newFields }));
  };
  
  const removeFormField = (index) => {
    const newFields = formData.formFields.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, formFields: newFields }));
  };
  
  const addOptionToField = (index) => {
    const newFields = [...formData.formFields];
    newFields[index].options = [...newFields[index].options, ""];
    setFormData(prev => ({ ...prev, formFields: newFields }));
  };
  
  const updateOption = (fieldIndex, optionIndex, value) => {
    const newFields = [...formData.formFields];
    newFields[fieldIndex].options[optionIndex] = value;
    setFormData(prev => ({ ...prev, formFields: newFields }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Filter out empty tags
      const filteredTags = formData.tags.filter(tag => tag.trim() !== "");
      
      const eventData = {
        ...formData,
        maxParticipants: parseInt(formData.maxParticipants) || null,
        tags: filteredTags,
        formFields: formData.formFields
          .filter(field => field.name.trim() !== "")
          .map(field => ({
            ...field,
            required: field.required || false,
            options: field.options.filter(opt => opt.trim() !== "")
          }))
      };
      
      const response = await fetch(`${API_URL}/api-platform/events`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(eventData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        router.push(`/api-platform/events/${result.data._id}`);
      } else {
        setError(result.message || "Failed to create event");
      }
    } catch (err) {
      setError("An error occurred while creating the event");
      console.error("Create event error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter event title"
            className="h-12 bg-black border-white/20 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="auto-generated from title"
              className="h-12 bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe your event in detail"
          rows={4}
          className="bg-black border-white/20 text-white"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date & Time *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="h-12 bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date & Time *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="h-12 bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="registrationStartDate">Registration Start Date *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="registrationStartDate"
              type="datetime-local"
              value={formData.registrationStartDate}
              onChange={(e) => handleChange("registrationStartDate", e.target.value)}
              className="h-12 bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="registrationEndDate">Registration End Date *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="registrationEndDate"
              type="datetime-local"
              value={formData.registrationEndDate}
              onChange={(e) => handleChange("registrationEndDate", e.target.value)}
              className="h-12 bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Event location or online"
              className="h-12 bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maxParticipants">Maximum Participants</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="maxParticipants"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => handleChange("maxParticipants", e.target.value)}
              placeholder="Leave empty for unlimited"
              className="h-12 bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bannerImage">Banner Image URL</Label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="bannerImage"
              value={formData.bannerImage}
              onChange={(e) => handleChange("bannerImage", e.target.value)}
              placeholder="URL to banner image"
              className="h-12 bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="Event website URL"
              className="h-12 bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="space-y-3">
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                placeholder={`Tag ${index + 1}`}
                className="flex-1 bg-black border-white/20 text-white"
              />
              {formData.tags.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeTag(index)}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addTag}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Tag
          </Button>
        </div>
      </div>
    </div>
  );
  
  const renderFormFields = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Registration Form Fields</h3>
        <p className="text-gray-400">Customize the registration form for participants</p>
        
        {formData.formFields.map((field, index) => (
          <div key={field.id} className="p-4 rounded-xl bg-black border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-white">Field {index + 1}</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeFormField(index)}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={field.name}
                  onChange={(e) => updateFormField(index, "name", e.target.value)}
                  placeholder="Field name"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Type *</Label>
                <select
                  value={field.type}
                  onChange={(e) => updateFormField(index, "type", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TEXT">Text</option>
                  <option value="TEXTAREA">Text Area</option>
                  <option value="SELECT">Dropdown</option>
                  <option value="MULTI_SELECT">Multi-select</option>
                  <option value="CHECKBOX">Checkbox</option>
                  <option value="RADIO">Radio Buttons</option>
                  <option value="FILE">File Upload</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={field.placeholder}
                onChange={(e) => updateFormField(index, "placeholder", e.target.value)}
                placeholder="Placeholder text"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id={`required-${index}`}
                checked={field.required}
                onChange={(e) => updateFormField(index, "required", e.target.checked)}
                className="rounded border-white/20 text-blue-500 focus:ring-blue-500"
              />
              <Label htmlFor={`required-${index}`}>Required</Label>
            </div>
            
            {(field.type === "SELECT" || field.type === "MULTI_SELECT" || field.type === "RADIO") && (
              <div className="mt-4 space-y-2">
                <Label>Options</Label>
                {field.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, optIndex, e.target.value)}
                      placeholder={`Option ${optIndex + 1}`}
                      className="flex-1 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addOptionToField(index)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
            )}
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addFormField}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Form Field
        </Button>
      </div>
    </div>
  );
  
  const renderPreview = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Event Preview</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-white">{formData.title}</h4>
            <p className="text-gray-400 text-sm">{formData.slug}</p>
          </div>
          
          <p className="text-gray-300">{formData.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{formData.startDate ? new Date(formData.startDate).toLocaleString() : "Not set"} - {formData.endDate ? new Date(formData.endDate).toLocaleString() : "Not set"}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{formData.location || "Online"}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-4 h-4" />
              <span>{formData.maxParticipants ? `${formData.maxParticipants} participants` : "Unlimited"}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Registration: {formData.registrationStartDate ? new Date(formData.registrationStartDate).toLocaleDateString() : "Not set"} - {formData.registrationEndDate ? new Date(formData.registrationEndDate).toLocaleDateString() : "Not set"}</span>
            </div>
          </div>
          
          {formData.tags.filter(tag => tag.trim() !== "").length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.filter(tag => tag.trim() !== "").map((tag, index) => (
                <span key={index} className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <h4 className="font-medium text-white mb-4">Registration Form Preview</h4>
        
        {formData.formFields.length === 0 ? (
          <p className="text-gray-400">No form fields added</p>
        ) : (
          <div className="space-y-4">
            {formData.formFields.map((field, index) => (
              <div key={index} className="p-4 rounded-lg bg-black border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-white">{field.name}</span>
                  {field.required && <span className="text-red-400">*</span>}
                </div>
                
                {field.type === "TEXT" && (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-500"
                  />
                )}
                
                {field.type === "TEXTAREA" && (
                  <textarea
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-500"
                  />
                )}
                
                {(field.type === "SELECT" || field.type === "MULTI_SELECT") && (
                  <select
                    multiple={field.type === "MULTI_SELECT"}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                  >
                    {field.options.map((option, optIndex) => (
                      <option key={optIndex} value={option}>{option}</option>
                    ))}
                  </select>
                )}
                
                {field.type === "RADIO" && (
                  <div className="space-y-2">
                    {field.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input type="radio" id={`opt-${index}-${optIndex}`} name={`field-${index}`} />
                        <label htmlFor={`opt-${index}-${optIndex}`} className="text-gray-300">{option}</label>
                      </div>
                    ))}
                  </div>
                )}
                
                {field.type === "CHECKBOX" && (
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-gray-300">{field.placeholder}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  const renderNavigationButtons = () => (
    <div className="flex justify-between pt-6 border-t border-white/10">
      <Button
        variant="outline"
        onClick={() => setStep(step - 1)}
        disabled={step === 1}
        className="border-white/20 text-white hover:bg-white/10"
      >
        Previous
      </Button>
      
      {step < 3 ? (
        <Button
          onClick={() => setStep(step + 1)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Event...
            </>
          ) : (
            "Create Event"
          )}
        </Button>
      )}
    </div>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-white">Create New Event</h1>
        <p className="text-gray-400 mt-1">Fill out the details to create your event</p>
      </div>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setStep(1)}
          className={`px-4 py-2 rounded-lg ${
            step === 1 
              ? "bg-blue-600 text-white" 
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Basic Info
        </button>
        <button
          onClick={() => setStep(2)}
          className={`px-4 py-2 rounded-lg ${
            step === 2 
              ? "bg-blue-600 text-white" 
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Form Fields
        </button>
        <button
          onClick={() => setStep(3)}
          className={`px-4 py-2 rounded-lg ${
            step === 3 
              ? "bg-blue-600 text-white" 
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Preview
        </button>
      </div>
      
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {step === 1 && renderBasicInfo()}
        {step === 2 && renderFormFields()}
        {step === 3 && renderPreview()}
        
        {renderNavigationButtons()}
      </form>
    </motion.div>
  );
}
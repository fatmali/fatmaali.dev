"use client";

import { motion } from "framer-motion";
import { GeometricShapes } from "../geometric-shapes";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Turnstile from "../Turnstile";
import { trackEvents } from "../google-analytics";

// Custom terminal-style dropdown component
const TerminalDropdown = ({ 
  options, 
  defaultValue, 
  onChange 
}: { 
  options: { value: string; label: string }[];
  defaultValue: string;
  onChange?: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find(opt => opt.value === defaultValue) || options[0]
  );
  const [cursorPosition, setCursorPosition] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Cursor blink animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPosition(prev => (prev + 1) % 15);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSelect = (option: typeof options[0]) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all terminal-font sketch-box dark:neon-border flex items-center justify-between group"
      >
        <span className="flex items-center">
          <span className="text-primary dark:text-neon-green mr-1 opacity-70">$</span>
          <span className="mr-1">subject:</span>
          <span className="text-secondary dark:text-neon-blue">
            {selectedOption.label}
            {cursorPosition < 5 && <span className="inline-block w-2 h-5 bg-primary dark:bg-neon-green ml-1 animate-flicker"></span>}
          </span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className={`transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
        </svg>
      </button>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 w-full mt-2 bg-background border border-input dark:border-primary rounded-lg shadow-lg overflow-hidden dark:bg-card"
        >
          <div className="p-1">
            <div className="p-2 border-b border-input dark:border-primary/30 mb-1 text-xs text-muted-foreground flex items-center">
              <span className="text-primary dark:text-neon-green mr-1">{'>'}</span> 
              Available options:
            </div>
            {options.map((option) => (
              <motion.div
                key={option.value}
                onClick={() => handleSelect(option)}
                whileHover={{ x: 4, backgroundColor: 'rgba(var(--primary-rgb), 0.1)' }}
                className={`p-2 cursor-pointer rounded flex items-center ${
                  selectedOption.value === option.value ? 'bg-primary/10 dark:bg-primary/20' : ''
                }`}
              >
                <span className="text-primary dark:text-neon-green mr-1 opacity-70">#</span>
                {option.label}
                {selectedOption.value === option.value && (
                  <span className="ml-auto text-primary dark:text-neon-green">*</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      <input 
        type="hidden" 
        name="subject" 
        value={selectedOption.value} 
      />
    </div>
  );
};

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "collaboration", // Default value
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }));
  };
  
  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    
    // Submit form
    try {
      setIsSubmitting(true);
      
      // Get the API endpoint from environment variable
      const apiBaseUrl = process.env.NEXT_PUBLIC_FUNCTION_APP_URL || '';
      
      // For deployment: If no environment variable is set, use a placeholder that will be replaced during deployment
      const apiEndpoint = apiBaseUrl || '{{AZURE_FUNCTION_URL}}';
      
      // Use the Azure Function API endpoint
      const apiUrl = `${apiEndpoint}/send-email`;
            
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }
      
      // Track successful form submission
      trackEvents.trackContactSubmit(true);
      
      // Success
      toast.success("Message sent successfully! I'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "collaboration",
        message: "",
      });
      
      // Reset Turnstile token and widget if it exists and we have the widget ID
      setTurnstileToken(null);
      
    } catch (error) {
      // Track failed form submission
      trackEvents.trackContactSubmit(false);
      
      toast.error(error instanceof Error ? error.message : "Failed to send email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 bg-muted dark:bg-muted/10 relative"
    >
      {/* Fun geometric shapes for Contact section */}
      <GeometricShapes
        fixed={false}
        density={1.5}
        section="contact"
        opacity={0.12}
        minSize={10}
        maxSize={45}
      />
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, 20, 0],
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text bg-gradient-to-r from-secondary via-accent to-primary">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Interested in working together? Feel free to reach out for
            collaborations or just a friendly hello!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card rounded-2xl shadow-xl p-8 border border-border relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href="mailto:ping@fatmaali.dev"
                      className="font-medium hover:text-primary transition-colors"
                    >
                      ping@fatmaali.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <span className="font-medium">Nairobi, KE 🇰🇪</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-sm font-medium mb-3">Connect with me</h4>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "GitHub",
                      icon: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z",
                      color: "from-gray-700 to-gray-900",
                      url: "https://github.com/fatmali"
                    },
                    {
                      name: "LinkedIn",
                      icon: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z",
                      color: "from-blue-600 to-blue-800",
                      url: "https://www.linkedin.com/in/fatmali/"
                    },
                    {
                      name: "Medium",
                      icon: "M16 0H0v16h16V0zm-1 15H1V1h14v14zM5.5 4.5h2v7h-2v-7zm3.5 0h2v7h-2v-7zm3.5 0h2v7h-2v-7z",
                      color: "from-green-600 to-green-800",
                      url: "https://medium.com/@fatmali"
                    }
                  ].map((platform) => (
                    <motion.a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${platform.color} text-white`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d={platform.icon} />
                      </svg>
                      <span className="sr-only">{platform.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all terminal-font sketch-box dark:neon-border"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all terminal-font sketch-box dark:neon-border"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="subject">
                  Subject
                </label>
                <TerminalDropdown
                  options={[
                    { value: "project", label: "Project Inquiry" },
                    { value: "collaboration", label: "Collaboration" },
                    { value: "other", label: "Other" }
                  ]}
                  defaultValue={formData.subject}
                  onChange={handleSubjectChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  rows={4}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all terminal-font sketch-box dark:neon-border"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <div>
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  onVerify={handleTurnstileVerify}
                  theme="auto"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full px-6 py-3 bg-muted text-foreground rounded-full font-medium border border-border terminal-button sketch-box ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              <p className="text-xs text-muted-foreground text-center mt-2">
                This site is protected by Cloudflare Turnstile to prevent spam.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
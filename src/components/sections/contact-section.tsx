"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import Turnstile from "../Turnstile";
import { trackEvents } from "../google-analytics";
import { StickyNote } from "../ui/StickyNote";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "collaboration",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);

      const configuredBase = process.env.NEXT_PUBLIC_FUNCTION_APP_URL?.trim().replace(/\/+$/, "");
      const localhostHosts = ["localhost", "127.0.0.1", "[::1]"];
      const isBrowser = typeof window !== "undefined";
      const isLocalConfigured = configuredBase
        ? localhostHosts.some((host) => configuredBase.includes(host))
        : false;
      const isLocalContext = isBrowser
        ? localhostHosts.includes(window.location.hostname)
        : false;
      const baseEndpoint = !configuredBase || (!isLocalContext && isLocalConfigured)
        ? "/api"
        : configuredBase;
      const apiUrl = baseEndpoint === "/api" ? "/api/send-email" : `${baseEndpoint}/send-email`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send email");

      trackEvents.trackContactSubmit(true);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "collaboration", message: "" });
      setTurnstileToken(null);
    } catch (error) {
      trackEvents.trackContactSubmit(false);
      toast.error(error instanceof Error ? error.message : "Failed to send email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      {/* Decorative sticky notes */}
      <div className="pointer-events-none select-none absolute inset-0">
        <StickyNote
          className="hidden lg:block absolute top-16 left-8"
          size="sm"
          color="bg-blue-200"
          rotate={-15}
        >
          let&apos;s
          build
          together
        </StickyNote>
        
        <StickyNote
          className="hidden lg:block absolute top-32 right-12"
          size="sm"
          color="bg-yellow-200"
          rotate={8}
        >
          coffee
          chat? ☕
        </StickyNote>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s work together</h2>
          <div className="w-16 h-0.5 bg-foreground mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Need help with your software? Or just want to chat about tech? 
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-6">Get in touch</h3>
                <div className="space-y-6">
                  {/* Email */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl border border-border flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <motion.a 
                        href="mailto:ping@fatmaali.dev" 
                        whileHover={{ x: 2 }}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ping@fatmaali.dev
                      </motion.a>
                    </div>
                  </motion.div>

                  {/* Location */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl border border-border flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Nairobi, KE 🇰🇪</p>
                    </div>
                  </motion.div>

                  {/* Response time */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl border border-border flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Response time</p>
                      <p className="text-muted-foreground">Usually within 24 hours</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <h4 className="text-sm font-medium mb-4 text-muted-foreground">Connect with me</h4>
                <div className="flex gap-4">
                  {[
                    {
                      name: "GitHub",
                      icon: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z",
                      url: "https://github.com/fatmali",
                    },
                    {
                      name: "LinkedIn",
                      icon: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z",
                      url: "https://www.linkedin.com/in/fatmali/",
                    },
                  ].map((platform, i) => (
                    <motion.a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-12 h-12 rounded-2xl border border-border hover:bg-muted/50 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d={platform.icon} />
                      </svg>
                      <span className="sr-only">{platform.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition-colors"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition-colors"
                      placeholder="you@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium mb-2" htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition-colors"
                  >
                    <option value="project">Project Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
                  <textarea
                    rows={5}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                    onVerify={handleTurnstileVerify}
                    theme="auto"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full px-6 py-4 rounded-full font-semibold bg-foreground text-background transition-all duration-200 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-foreground/90"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </motion.button>

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-muted-foreground text-center"
                >
                  Protected by Cloudflare Turnstile.
                </motion.p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Info, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate submission animation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3c5e] to-[#0a1b2d] px-6 py-12 text-center shadow-xl sm:px-12 my-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative mx-auto max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            <MessageSquare className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Support &amp; Feedback</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-3 text-sm text-blue-100/70">
            Have questions, feature requests, or custom utility tool ideas? Get in touch with the HelloTools team.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        
        {/* Info Column */}
        <div className="md:col-span-1 space-y-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <Info className="h-5 w-5 text-[#f97316]" />
              <span>Get Support</span>
            </h3>
            <p className="text-xs text-slate-650 dark:text-blue-200/70 leading-relaxed">
              We respond to bug reports, calculations questions, and site inquiries within 24–48 hours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-500" />
              <span>Direct Email</span>
            </h3>
            <p className="text-xs text-slate-650 dark:text-blue-200/70">
              Skip the form and email us directly at:
            </p>
            <a 
              href="mailto:contact@hellotools.net" 
              className="block font-bold text-sm text-[#f97316] hover:underline break-all"
            >
              contact@hellotools.net
            </a>
          </div>

        </div>

        {/* Contact Form Column */}
        <div className="md:col-span-2">
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10 space-y-4 animate-fade-in">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-650 dark:text-blue-200/70 max-w-sm">
                  Thank you for reaching out. We will review your message and get back to you shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline h-9 px-4 text-xs font-bold border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full h-10 px-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:outline-none focus:border-[#f97316] text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full h-10 px-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:outline-none focus:border-[#f97316] text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Bug Report / Tool Request"
                    className="w-full h-10 px-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:outline-none focus:border-[#f97316] text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    id="message" 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please describe how we can help you..."
                    className="w-full p-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:outline-none focus:border-[#f97316] text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg bg-[#1a3c5e] text-white font-bold hover:bg-[#112942] focus:outline-none flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

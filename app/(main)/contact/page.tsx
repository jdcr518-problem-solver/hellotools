'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Info, Send, CheckCircle2, MapPin, User, Clock, ChevronRight, Home, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '76d6bdec-e5fb-4e29-8de9-f42f278df9aa';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Contact Message from ${formData.name}`,
          message: formData.message,
          from_name: 'HelloTools Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(result.message || 'Something went wrong while sending your message. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your internet connection or email contact@hellotools.net directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hellotools.net',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact Us',
        item: 'https://hellotools.net/contact',
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl">
        <Link href="/" className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold">Contact Us</span>
      </nav>

      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3c5e] to-[#0a1b2d] px-6 py-12 text-center shadow-xl sm:px-12 my-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative mx-auto max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            <MessageSquare className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Contact HelloTools
          </h1>
          <p className="mt-3 text-sm text-blue-100/80 leading-relaxed">
            Have questions about a formula, found a bug, or want to suggest a new tool? We are here to help.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        
        {/* Contact Information & Publisher Meta Column */}
        <div className="md:col-span-1 space-y-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#f97316]" />
              <span>Direct Email</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              For direct inquiries, bug reports, and partnership requests:
            </p>
            <a 
              href="mailto:contact@hellotools.net" 
              className="block font-bold text-sm text-[#f97316] hover:underline break-all"
            >
              contact@hellotools.net
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              <span>Publisher Details</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-gray-300">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                <span><strong>Owner:</strong> Abdul Rehman</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                <span><strong>Location:</strong> Pakistan</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                <span><strong>Response Time:</strong> 24–48 hours</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 text-xs text-orange-950 dark:text-orange-200 space-y-2">
            <p className="font-semibold">Tool Correction Notice:</p>
            <p className="leading-relaxed">
              If reporting a mathematical discrepancy in a calculator, please include the specific numbers entered, your expected result, and any formula or reference standard.
            </p>
          </div>

        </div>

        {/* Contact Form Column */}
        <div className="md:col-span-2">
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Fill out this form and our team will review your message promptly.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Message Received!</h3>
                <p className="text-sm text-slate-600 dark:text-gray-300 max-w-sm">
                  Thank you for contacting HelloTools. Abdul and the team will get back to you at your provided email within 24–48 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-2 h-9 px-4 text-xs font-bold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Miller"
                      className="w-full h-10 px-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:outline-none focus:border-[#f97316] text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full h-10 px-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:outline-none focus:border-[#f97316] text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Subject / Category
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Suggestion for Mortgage Calculator / Bug Report"
                    className="w-full h-10 px-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:outline-none focus:border-[#f97316] text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    id="message" 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help? Please describe your request or calculation feedback..."
                    className="w-full p-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:outline-none focus:border-[#f97316] text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Honeypot Spam Protection (Hidden from real users) */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                {errorMessage && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg bg-[#1a3c5e] text-white font-bold hover:bg-[#112942] focus:outline-none flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

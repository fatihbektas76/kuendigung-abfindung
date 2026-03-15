'use client';

import { useState, FormEvent } from 'react';
import FadeUp from './FadeUp';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          phone: formData.get('phone'),
          disputeType: formData.get('disputeType'),
          disputeValue: formData.get('disputeValue'),
          message: formData.get('message'),
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setLoading(false);
      alert('Something went wrong. Please try again or email us directly at bektas@apos.legal');
    }
  }

  return (
    <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="contact">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Contact
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Tell Us About Your Case
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mb-10">
          Fill out the form below and we&rsquo;ll assess your situation. Free of charge, usually within 48
          hours.
        </p>
        <div className="grid grid-cols-2 gap-14 items-start max-md:grid-cols-1 max-md:gap-8">
          <FadeUp>
            <div>
              <h3 className="font-serif text-[1.4rem] font-bold mb-4">What happens next?</h3>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
                After you submit your inquiry, we review the details and get back to you with an initial
                assessment — including whether you have a viable claim, which court would handle your case,
                and an estimate of costs and timeline.
              </p>
              <div className="flex items-center gap-3 mb-3.5 text-[0.92rem] text-ink-light">
                <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4l-10 8L2 4" />
                  </svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <br />
                  <a href="mailto:bektas@apos.legal" className="text-ink-light no-underline hover:text-gold transition-colors">
                    bektas@apos.legal
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3.5 text-[0.92rem] text-ink-light">
                <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <strong>Phone</strong>
                  <br />
                  <a href="tel:+4915127003173" className="text-ink-light no-underline hover:text-gold transition-colors">
                    +49 151 2700 3173
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3.5 text-[0.92rem] text-ink-light">
                <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <div>
                  <strong>Book a call</strong>
                  <br />
                  <a
                    href="https://meet.brevo.com/fatih-bektas/initial-free-consultation-by-phone-lp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-light no-underline hover:text-gold transition-colors"
                  >
                    Schedule via Brevo
                  </a>
                </div>
              </div>
              <div className="mt-6 py-4 px-5 bg-cream rounded-sm border-l-[3px] border-gold">
                <p className="text-[0.85rem] text-ink-muted m-0 leading-relaxed">
                  <strong className="text-ink font-semibold">Response time:</strong> We typically respond
                  within 48 hours on business days. If you&rsquo;ve been served with a German lawsuit,
                  mention it in your message — we prioritize urgent deadline matters.
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={1}>
            <div className="bg-cream border border-border-light rounded p-9 px-8">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                        Full Name <span className="text-gold-dark ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Smith"
                        required
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                        Email <span className="text-gold-dark ml-0.5">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@company.com"
                        required
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">Company</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Your company name"
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="disputeType" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Type of Dispute
                    </label>
                    <select
                      id="disputeType"
                      name="disputeType"
                      aria-label="Type of dispute"
                      defaultValue=""
                      className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                    >
                      <option value="" disabled>
                        Select the type of dispute
                      </option>
                      <option value="commercial">Commercial / Trade Dispute</option>
                      <option value="employment">Employment Claim</option>
                      <option value="contract">Contract Enforcement</option>
                      <option value="shareholder">Shareholder Dispute</option>
                      <option value="judgment">Judgment Enforcement</option>
                      <option value="arbitration">Arbitration</option>
                      <option value="defense">I&rsquo;ve been sued in Germany</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="disputeValue" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Estimated Dispute Value
                    </label>
                    <select
                      id="disputeValue"
                      name="disputeValue"
                      aria-label="Approximate dispute value"
                      defaultValue=""
                      className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                    >
                      <option value="" disabled>
                        Select approximate value
                      </option>
                      <option value="under-50k">Under &euro;50,000</option>
                      <option value="50k-250k">&euro;50,000 &ndash; &euro;250,000</option>
                      <option value="250k-1m">&euro;250,000 &ndash; &euro;1,000,000</option>
                      <option value="over-1m">Over &euro;1,000,000</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Your Message <span className="text-gold-dark ml-0.5">*</span>
                    </label>
                    <textarea
                      name="message"
                      placeholder="Briefly describe your situation — what happened, who is involved, and what outcome you're looking for."
                      required
                      className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none resize-y min-h-[120px] focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                    />
                    <div className="text-[0.78rem] text-ink-muted mt-1">
                      Include any deadlines you&rsquo;re aware of, especially if you&rsquo;ve received a
                      German court document.
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gold text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    {loading ? 'Sending...' : 'Send Inquiry \u2192'}
                  </button>
                  <p className="text-[0.76rem] text-ink-muted mt-3 text-center leading-relaxed">
                    By submitting this form, you agree to our{' '}
                    <a href="/privacy-policy" className="text-gold-dark underline">
                      Privacy Policy
                    </a>
                    . Your data will be processed solely for the purpose of responding to your inquiry.
                  </p>
                </form>
              ) : (
                <div className="text-center py-10 px-5">
                  <h3 className="font-serif text-[1.3rem] font-bold text-ink mb-2">
                    &#10003; Inquiry Received
                  </h3>
                  <p className="text-[0.95rem] text-ink-muted">
                    Thank you for reaching out. We&rsquo;ll review your case and respond within 48 hours.
                  </p>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

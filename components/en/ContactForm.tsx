'use client';

import { useState, type FormEvent } from 'react';
import FadeUp from '../FadeUp';

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
          website: formData.get('website'),
          locale: 'en',
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setLoading(false);
      alert(
        'Something went wrong. Please try again, or write to us directly at bektas@apos.legal',
      );
    }
  }

  return (
    <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="contact">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Contact
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Tell us about your case
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[600px] leading-relaxed mb-10">
          Fill in the form — we will review your situation. Free of charge, typically within
          48 hours. We handle German labour-law matters in English.
        </p>
        <div className="grid grid-cols-2 gap-14 items-start max-md:grid-cols-1 max-md:gap-8">
          <FadeUp>
            <div>
              <h3 className="font-serif text-[1.4rem] font-bold mb-4">What happens next?</h3>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
                After your enquiry we review the details and reply with an initial assessment —
                whether the dismissal can be challenged, how high a likely severance could be
                and which next steps make sense.
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
                  <a
                    href="mailto:bektas@apos.legal"
                    className="text-ink-light no-underline hover:text-gold transition-colors"
                  >
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
                  <a
                    href="tel:+49622295992400"
                    className="text-ink-light no-underline hover:text-gold transition-colors"
                  >
                    +49 6222 9599 2400
                  </a>
                </div>
              </div>
              <div className="flex justify-center mt-5 mb-3.5">
                <a
                  href="https://meet.brevo.com/fatih-bektas/erstberatung-per-telefon-kuendigung-arbeitsrechtde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 py-3.5 px-8 border-2 border-gold bg-gold-bg text-gold-dark font-semibold text-[0.95rem] rounded-sm no-underline transition-all hover:bg-gold hover:text-white hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  Book a phone consultation
                </a>
              </div>
              <div className="mt-6 py-4 px-5 bg-cream rounded-sm border-l-[3px] border-gold">
                <p className="text-[0.85rem] text-ink-muted m-0 leading-relaxed">
                  <strong className="text-ink font-semibold">Response time:</strong> we reply
                  within 48 hours on working days. If you have already received a dismissal,
                  please mention it — deadline-sensitive cases are prioritised.
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={1}>
            <div className="bg-cream border border-border-light rounded p-9 px-8">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                        Full name <span className="text-gold-dark ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Jane Doe"
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
                        placeholder="jane@example.com"
                        required
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                        Employer
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Name of your employer"
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+49 151 1234 5678"
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="disputeType"
                      className="block text-[0.84rem] font-semibold text-ink mb-1.5"
                    >
                      Type of matter
                    </label>
                    <select
                      id="disputeType"
                      name="disputeType"
                      aria-label="Type of matter"
                      defaultValue=""
                      className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                    >
                      <option value="" disabled>
                        Please choose
                      </option>
                      <option value="kuendigung">Received a dismissal</option>
                      <option value="aufhebungsvertrag">Received a termination agreement</option>
                      <option value="fristlose-kuendigung">Summary (without-notice) dismissal</option>
                      <option value="abfindung">Negotiate severance</option>
                      <option value="abmahnung">Received a written warning</option>
                      <option value="zeugnis">Reference / exit arrangements</option>
                      <option value="sonstiges">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="disputeValue"
                      className="block text-[0.84rem] font-semibold text-ink mb-1.5"
                    >
                      Gross monthly salary
                    </label>
                    <select
                      id="disputeValue"
                      name="disputeValue"
                      aria-label="Your gross monthly salary"
                      defaultValue=""
                      className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                    >
                      <option value="" disabled>
                        Please choose
                      </option>
                      <option value="unter-3000">Under &euro;3,000</option>
                      <option value="3000-5000">&euro;3,000 &ndash; &euro;5,000</option>
                      <option value="5000-10000">&euro;5,000 &ndash; &euro;10,000</option>
                      <option value="ueber-10000">Over &euro;10,000</option>
                      <option value="keine-angabe">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Your message <span className="text-gold-dark ml-0.5">*</span>
                    </label>
                    <textarea
                      name="message"
                      placeholder="Briefly describe your situation — what happened, when did you receive the dismissal, and what would you like to achieve?"
                      required
                      className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none resize-y min-h-[120px] focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                    />
                    <div className="text-[0.78rem] text-ink-muted mt-1">
                      Please mention any deadlines, especially if you have already received a
                      dismissal letter.
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gold text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    {loading ? 'Sending…' : 'Send enquiry →'}
                  </button>
                  <p className="text-[0.76rem] text-ink-muted mt-3 text-center leading-relaxed">
                    By submitting you agree to our{' '}
                    <a href="/en/privacy-policy" className="text-gold-dark underline">
                      privacy policy
                    </a>
                    . Your data is used exclusively to handle your enquiry.
                  </p>
                </form>
              ) : (
                <div className="text-center py-10 px-5">
                  <h3 className="font-serif text-[1.3rem] font-bold text-ink mb-2">
                    &#10003; Enquiry received
                  </h3>
                  <p className="text-[0.95rem] text-ink-muted">
                    Thank you. We will review your case and respond within 48 hours.
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

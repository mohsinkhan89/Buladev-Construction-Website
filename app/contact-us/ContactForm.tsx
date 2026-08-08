"use client";

import { CheckCircle2, Database, Loader2, LockKeyhole, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setSubmitState({ type: "error", message: data.error || "Unable to send your message." });
        return;
      }

      form.reset();
      setSubmitState({ type: "success", message: data.message || "Your message has been sent." });
      successTimerRef.current = setTimeout(() => {
        setSubmitState({ type: "idle", message: "" });
        successTimerRef.current = null;
      }, 4400);
    } catch {
      setSubmitState({ type: "error", message: "Unable to reach the contact service." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form-card service-card" onSubmit={handleSubmit}>
      <div className="contact-form-heading section-heading">
        <h2>Send Us A Message</h2>
      </div>

      <div className="contact-form-grid">
        <label>
          <span>Your Name</span>
          <input name="name" type="text" placeholder="Your Name" required />
        </label>
        <label>
          <span>Your Email</span>
          <input name="email" type="email" placeholder="Your Email" required />
        </label>
        <label>
          <span>Phone Number</span>
          <input name="phone" type="tel" placeholder="Phone Number" />
        </label>
        <label>
          <span>Subject</span>
          <input name="subject" type="text" placeholder="Subject" required />
        </label>
        <label className="contact-form-wide">
          <span>Your Message</span>
          <textarea name="message" placeholder="Your Message" required rows={6} />
        </label>
      </div>

      {submitState.type !== "idle" ? (
        <div className={`contact-submit-message ${submitState.type === "success" ? "is-success" : "is-error"}`}>
          {submitState.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <Database className="h-5 w-5" />}
          <span>{submitState.message}</span>
        </div>
      ) : null}

      <button className="contact-submit modern-action-btn magnetic-btn" disabled={isSubmitting} type="submit">
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
      </button>

      <p className="contact-form-note">
        <LockKeyhole className="h-3.5 w-3.5" />
        Your information is secure and will never be shared with third parties.
      </p>
    </form>
  );
}

"use client";

import { Building2, CheckCircle2, Database, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function BidListForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/bid-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.get("companyName"),
          contactName: formData.get("contactName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          companyType: formData.get("companyType"),
          primaryTrade: formData.get("primaryTrade"),
          scopes: formData.get("scopes"),
          serviceArea: formData.get("serviceArea"),
          licenseCertification: formData.get("licenseCertification"),
          insuranceConfirmation: formData.get("insuranceConfirmation") === "yes",
        }),
      });
      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setSubmitState({ type: "error", message: data.error || "Unable to submit your request." });
        return;
      }

      form.reset();
      setSubmitState({ type: "success", message: data.message || "Your bid list request has been submitted." });
    } catch {
      setSubmitState({ type: "error", message: "Unable to reach the submission service." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="bid-list-form" onSubmit={handleSubmit}>
      <div className="bid-list-form-heading">
        <Building2 className="h-6 w-6" />
        <div>
          <h3>Company Information</h3>
          <p>Required fields are marked with an asterisk.</p>
        </div>
      </div>

      <div className="bid-list-form-grid">
        <label className="bid-list-field">
          <span>Company Name *</span>
          <input name="companyName" placeholder="Your company" required type="text" />
        </label>

        <label className="bid-list-field">
          <span>Contact Name *</span>
          <input name="contactName" placeholder="Primary contact" required type="text" />
        </label>

        <label className="bid-list-field">
          <span>Email Address *</span>
          <input name="email" placeholder="name@company.com" required type="email" />
        </label>

        <label className="bid-list-field">
          <span>Phone Number *</span>
          <input name="phone" placeholder="(000) 000-0000" required type="tel" />
        </label>

        <label className="bid-list-field">
          <span>Company Type *</span>
          <select name="companyType" required defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Subcontractor</option>
            <option>Supplier</option>
            <option>Consultant</option>
            <option>Service Provider</option>
          </select>
        </label>

        <label className="bid-list-field">
          <span>Primary Trade *</span>
          <input name="primaryTrade" placeholder="Concrete, electrical, framing..." required type="text" />
        </label>

        <label className="bid-list-field bid-list-field-wide">
          <span>Services / Scopes of Work *</span>
          <textarea name="scopes" placeholder="Tell us what scopes your team covers." required rows={4} />
        </label>

        <label className="bid-list-field">
          <span>Service Area</span>
          <input name="serviceArea" placeholder="Detroit, Southeast Michigan..." type="text" />
        </label>

        <label className="bid-list-field">
          <span>License / Certification</span>
          <input name="licenseCertification" placeholder="License number or certification" type="text" />
        </label>
      </div>

      <label className="bid-list-checkbox">
        <input name="insuranceConfirmation" type="checkbox" value="yes" />
        <span>We can provide current insurance, W-9, and compliance documents upon request.</span>
      </label>

      {submitState.type !== "idle" ? (
        <div className={`bid-list-submit-message ${submitState.type === "success" ? "is-success" : "is-error"}`}>
          {submitState.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <Database className="h-5 w-5" />}
          <span>{submitState.message}</span>
        </div>
      ) : null}

      <button className="bid-list-submit modern-action-btn magnetic-btn" disabled={isSubmitting} type="submit">
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        <span>{isSubmitting ? "Submitting..." : "Submit Bid List Request"}</span>
      </button>

      <p className="bid-list-note">
        <Database className="h-4 w-4" />
        Submissions are saved securely in the BULADEV dashboard.
      </p>
    </form>
  );
}

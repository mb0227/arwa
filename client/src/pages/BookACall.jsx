import React, { useState } from "react";
import "./BookACall.css";
import { db } from '../../firebaseConfig';
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function BookACall() {
  // Read API base from Vite env variables. Falls back to localhost for dev.
  const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    otherService: "",
    brandDescription: "",
    deadline: "",
    brandName: "",
    deadlineDate: "",
    showcasePermission: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [popup, setPopup] = useState({ show: false, success: false, message: "" });

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\+?\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number.";
    if (!formData.serviceType) newErrors.serviceType = "Please select a service.";
    if (formData.serviceType === "other" && !formData.otherService.trim())
      newErrors.otherService = "Please specify the service.";
    if (!formData.brandDescription.trim())
      newErrors.brandDescription = "Please describe your brand.";
    if (!formData.deadline.trim())
      newErrors.deadline = "Please specify if you have a deadline.";
    if (!formData.brandName.trim()) newErrors.brandName = "Brand name is required.";
    if (formData.deadline.toLowerCase() === "yes" && !formData.deadlineDate.trim())
      newErrors.deadlineDate = "Please provide a deadline date.";
    if (!formData.showcasePermission)
      newErrors.showcasePermission = "Please select an option.";
    if (!formData.additionalInfo.trim())
      newErrors.additionalInfo = "This field cannot be empty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      await addDoc(collection(db, "enquiries"), {
        ...formData,
        createdAt: Timestamp.now(),
      });
      await fetch(`${API_BASE}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setPopup({
        show: true,
        success: true,
        message: "Your enquiry has been submitted successfully!",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        serviceType: "",
        otherService: "",
        brandDescription: "",
        deadline: "",
        brandName: "",
        deadlineDate: "",
        showcasePermission: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error adding booking: ", error);
      setPopup({
        show: true,
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="book-a-call-page">
      {/* ===== Banner Section ===== */}
      <div className="banner">
        <div className="banner-background"></div>
        {/* <img
          src="/MASCOT-20.png"
          alt="Mascot decoration"
          className="banner-mascot banner-mascot--left"
        /> */}
        {/* <img
          src="/MASCOT-16.png"
          alt="Mascot decoration"
          className="banner-mascot banner-mascot--right"
        /> */}
        <div className="banner-container">
          <div className="banner-content-group">
            {/* <div className="banner-heading">
              <span className="heading-text">
                <span className="heading-highlight">Ready</span>{" "}
                to Dive In?
              </span>
            </div> */}

            <div className="banner-description-wrapper">
              <img
                src="/BookingPageBanner.png"
                alt="Booking page banner"
                className="banner-booking-image"
              />
              <div className="banner-description">
                <span className="desc-text">Explore all the </span>
                <span className="desc-bold">Details</span>
                <span className="desc-text">, </span>
                <span className="desc-bold">Pricing</span>
                <span className="desc-text">, and </span>
                <span className="desc-bold">FAQs</span>
                <span className="desc-text"> in one place.</span>
              </div>
              {/* <img
                src="/footer arrow.png"
                alt="Arrow pointing to the button"
                className="banner-footer-arrow"
              /> */}
            </div>

            <button className="full-services-btn">
              <div className="services-icon">
                <div className="icon-outline"></div>
                <div className="icon-circle"></div>
              </div>
              <span>Full Services Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== Form Section ===== */}
      <div className="page-content">
        <div className="form-container">
          <div className="form-background-white"></div>

          <div className="form-header-section">
            <h2 className="form-title">
              <span>Let's work together</span>
              <span className="form-title-break">Excited to collaborate?</span>
            </h2>
            <p className="form-subtitle">
              Share your vision, and let's make it happen — with bold, thoughtful design that truly represents you.
            </p>
          </div>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            {/* Full Name + Email */}
            <div className="form-row form-row-parallel">
              <div className="form-field form-field-half">
                <div className="field-labels">
                  <label className="label-english">Full Name *</label>
                  <label className="label-arabic">الإسم</label>
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-input ${errors.fullName ? "input-error" : ""}`}
                />
                {errors.fullName && <small className="error-text">{errors.fullName}</small>}
              </div>

              <div className="form-field form-field-half">
                <div className="field-labels">
                  <label className="label-english">Email Address *</label>
                  <label className="label-arabic">البريد الإلكتروني</label>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && <small className="error-text">{errors.email}</small>}
              </div>
            </div>

            {/* Phone + Service */}
            <div className="form-row form-row-parallel">
              <div className="form-field form-field-half">
                <div className="field-labels">
                  <label className="label-english">Phone Number *</label>
                  <label className="label-arabic">رقم الجوال</label>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? "input-error" : ""}`}
                />
                {errors.phone && <small className="error-text">{errors.phone}</small>}
              </div>

              <div className="form-field form-field-half">
                <div className="field-labels">
                  <label className="label-english">Choose the type of service you want: *</label>
                  <label className="label-arabic">اختر نوع الخدمة التي تريدها</label>
                </div>
                <div className={`form-select-wrapper ${errors.serviceType ? "select-error" : ""}`}>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`form-select ${errors.serviceType ? "input-error" : ""}`}
                  >
                    <option value="">Select a service / اختر خدمة</option>
                    <option value="design-visual-identity">Design Visual Identity / تصميم هوية بصرية</option>
                    <option value="logo-design">Logo Design / تصميم شعار</option>
                    <option value="other">Other / أخرى</option>
                  </select>
                  <div className="dropdown-icon">
                    <div className="dropdown-arrow"></div>
                  </div>
                </div>
                {errors.serviceType && <small className="error-text">{errors.serviceType}</small>}
              </div>
            </div>

            {/* If Other */}
            {formData.serviceType === "other" && (
              <div className="form-row">
                <div className="form-field form-field-full">
                  <div className="field-labels">
                    <label className="label-english">
                      If you chose "Other", please specify the requested service *
                    </label>
                    <label className="label-arabic">إذا اخترت "أخرى"، يرجى تحديد الخدمة المطلوبة</label>
                  </div>
                  <input
                    type="text"
                    name="otherService"
                    value={formData.otherService}
                    onChange={handleChange}
                    className={`form-input ${errors.otherService ? "input-error" : ""}`}
                  />
                  {errors.otherService && <small className="error-text">{errors.otherService}</small>}
                </div>
              </div>
            )}

            {/* Brand Description */}
            <div className="form-row">
              <div className="form-field form-field-full">
                <div className="field-labels">
                  <label className="label-english">Describe and talk about your brand *</label>
                  <label className="label-arabic">وصف وتحدث عن علامتك التجارية</label>
                </div>
                <textarea
                  name="brandDescription"
                  value={formData.brandDescription}
                  onChange={handleChange}
                  className={`form-input ${errors.brandDescription ? "input-error" : ""}`}
                  rows="3"
                ></textarea>
                {errors.brandDescription && <small className="error-text">{errors.brandDescription}</small>}
              </div>
            </div>

            {/* Deadline + Brand Name */}
            <div className="form-row form-row-parallel">
              <div className="form-field form-field-half">
                <div className="field-labels">
                  <label className="label-english">Do you have a deadline? *</label>
                  <label className="label-arabic">هل لديك موعد نهائي؟</label>
                </div>
                <div className={`form-select-wrapper ${errors.deadline ? "select-error" : ""}`}>
                  <select
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className={`form-select ${errors.deadline ? "input-error" : ""}`}
                  >
                    <option value="">Select / اختر</option>
                    <option value="yes">Yes / نعم</option>
                    <option value="no">No / لا</option>
                  </select>
                  <div className="dropdown-icon">
                    <div className="dropdown-arrow"></div>
                  </div>
                </div>
                {errors.deadline && <small className="error-text">{errors.deadline}</small>}
              </div>
              <div className="form-field form-field-half">
                <div className="field-labels">
                  <label className="label-english">What is your brand name? *</label>
                  <label className="label-arabic">ما هو اسم علامتك التجارية؟</label>
                </div>
                <input
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  className={`form-input ${errors.brandName ? "input-error" : ""}`}
                />
                {errors.brandName && <small className="error-text">{errors.brandName}</small>}
              </div>
            </div>

            {/* Deadline Date (if yes) */}
            {formData.deadline === "yes" && (
              <div className="form-row">
                <div className="form-field form-field-full">
                  <div className="field-labels">
                    <label className="label-english">Specify the deadline date *</label>
                    <label className="label-arabic">حدد تاريخ الموعد النهائي</label>
                  </div>
                  <input
                    type="date"
                    name="deadlineDate"
                    value={formData.deadlineDate}
                    onChange={handleChange}
                    className={`form-input ${errors.deadlineDate ? "input-error" : ""}`}
                  />
                  {errors.deadlineDate && <small className="error-text">{errors.deadlineDate}</small>}
                </div>
              </div>
            )}

            {/* Showcase Permission */}
            <div className="form-row">
              <div className="form-field form-field-full">
                <div className="field-labels">
                  <label className="label-english">
                    Will you allow me ("the designer") to share the work I did for your brand/project/product to showcase it only on social media (without sharing any personal information, especially about the client)? *
                  </label>
                  <label className="label-arabic">هل تسمح لي (المصمم) بمشاركة العمل الذي أنجزته لعلامتك التجارية/مشروعك/منتجك لعرضه على وسائل التواصل الاجتماعي فقط (دون مشاركة أي معلومات شخصية، وخاصةً معلومات عن العميل)؟</label>
                </div>
                <div className={`form-select-wrapper ${errors.showcasePermission ? "select-error" : ""}`}>
                  <select
                    name="showcasePermission"
                    value={formData.showcasePermission}
                    onChange={handleChange}
                    className={`form-select ${errors.showcasePermission ? "input-error" : ""}`}
                  >
                    <option value="">Select an option / اختر خياراً</option>
                    <option value="yes">Yes / نعم</option>
                    <option value="no">No / لا</option>
                  </select>
                  <div className="dropdown-icon">
                    <div className="dropdown-arrow"></div>
                  </div>
                </div>
                {errors.showcasePermission && (
                  <small className="error-text">{errors.showcasePermission}</small>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="form-row">
              <div className="form-field form-field-full">
                <div className="field-labels">
                  <label className="label-english">Any information you’d like to add or feel I should know *</label>
                  <label className="label-arabic">أي معلومات ترغب في إضافتها أو تشعر أنه يجب علي أن أعرفها</label>
                </div>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className={`form-input ${errors.additionalInfo ? "input-error" : ""}`}
                  rows="3"
                ></textarea>
                {errors.additionalInfo && <small className="error-text">{errors.additionalInfo}</small>}
              </div>
            </div>

            <button type="submit" className={`submit-btn ${submitting ? "loading" : ""}`} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Your Enquiry"}
            </button>
          </form>
        </div>
      </div>

      {/* ===== Popup ===== */}
      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-box ${popup.success ? "success" : "error"}`}>
            <img src="/popup-happy.svg" alt="Happy cloud" className="popup-cloud-icon" />
            <p>
              We'll <strong>review</strong> your submission and get back to you within{" "}
              <strong><span className="popup-emphasis">7 business days</span></strong>
            </p>
            <button className="popup-close-btn" onClick={() => setPopup({ ...popup, show: false })}>
              Back to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
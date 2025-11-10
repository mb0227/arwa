import React, { useState, useEffect, useRef } from 'react';
import './Services.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addOns, setAddOns] = useState([
    'Packaging Design',
    'Email Marketing Templates',
    'Additional Brand Collateral'
  ]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, 'services');
        const servicesSnapshot = await getDocs(servicesCollection);
        const servicesList = [];
        servicesSnapshot.forEach((doc) => {
          servicesList.push({ id: doc.id, ...doc.data() });
        });
        setServices(servicesList);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Dummy services data (will be replaced by backend data)
  const dummyServices = [
    {
      title: "Brand Identity Package",
      description: "Complete branding solution including logo, color palette, and brand guidelines.",
      price: "$2,500",
      features: [
        "Logo Design (Primary + Variations)",
        "Brand Color Palette",
        "Typography Selection",
        "Brand Guidelines Document",
        "Basic Stationery Design"
      ]
    },
    {
      title: "Digital Presence Package",
      description: "Establish your brand across digital platforms with cohesive design elements.",
      price: "$3,500",
      features: [
        "Social Media Templates",
        "Website Design Consultation",
        "Digital Asset Creation",
        "Content Strategy Guide",
        "Digital Brand Guidelines"
      ]
    },
    {
      title: "Enterprise Branding Solution",
      description: "Comprehensive branding package for established businesses looking to scale.",
      price: "$5,000+",
      features: [
        "Full Brand Strategy",
        "Complete Visual Identity",
        "Marketing Collateral Design",
        "Brand Story Development",
        "Implementation Guide"
      ]
    }
  ];

  return (
    <div className="services-page">
      {/* Banner Section */}
      <div className="services-banner">
        <div className="banner-background"></div>
        <div className="banner-container">
          
          <div className="banner-content">
            {/* Decorative Elements */}
            <div className="decorative-brain top-right">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0Z" fill="#E7A4F7" fillOpacity="0.2"/>
                <path d="M40 10C56.5685 10 70 23.4315 70 40C70 56.5685 56.5685 70 40 70C23.4315 70 10 56.5685 10 40C10 23.4315 23.4315 10 40 10Z" fill="#E7A4F7" fillOpacity="0.1"/>
              </svg>
            </div>
            <div className="decorative-brain bottom-left">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0Z" fill="#E7A4F7" fillOpacity="0.15"/>
                <path d="M50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20Z" fill="#E7A4F7" fillOpacity="0.1"/>
              </svg>
            </div>

            <div className="banner-icon-tick">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#E7A4F7" />
              </svg>
              <svg className="icon-overlay" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className='banner-heading'>
              <span className="title-accent">Tailored</span>{' '}
              <span className="design-mascot-container">
                <img
                  src="/MASCOT-23.png"
                  alt="Mascot"
                  className="mascot-on-text"
                />
                Branding
              </span>
              <br />Solutions
            </div>
            
            <p className="banner-description">
              Whether you're just starting or scaling up, I offer thoughtful design packages 
              built to grow with you — plus flexible add-ons to personalize your brand even further.
            </p>
            
            {/* Decorative dots */}
            <div className="decorative-dots left"></div>
            <div className="decorative-dots right"></div>
          </div>
        </div>
      </div>

      {/* Service Packages Section */}
      <main id="main-content" className="section-container">
        <section id="packages" className="service-packages" aria-labelledby="packages-title">
          <h2 id="packages-title">Service Packages</h2>
          <div className="packages-grid" role="list">
            {(services.length > 0 ? services : dummyServices).map((service, index) => (
              <div key={index} className="package-card" role="listitem" tabIndex="0">
                <div className="package-icon" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#E7A4F7" fillOpacity="0.2"/>
                  </svg>
                </div>
                <h3>{service.title}</h3>
                <p className="price" aria-label={`Price: ${service.price}`}>{service.price}</p>
                <p className="description">{service.description}</p>
                <ul className="features-list" aria-label="Package features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button className="learn-more-btn" aria-label={`Learn more about ${service.title}`}>
                  Learn More
                  <span className="sr-only"> about {service.title}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Add-Ons Section */}
        <section id="add-ons" className="add-ons" aria-labelledby="add-ons-title">
          <h2 id="add-ons-title">➕ Add-On Services</h2>
          <p>Need something extra? These can be added to any package:</p>
          <div className="add-ons-grid" role="list">
            {addOns.map((addon, index) => (
              <div key={index} className="add-on-card" role="listitem" tabIndex="0">
                <div className="add-on-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#E7A4F7" fillOpacity="0.2"/>
                    <path d="M12 8V16M8 12H16" stroke="#E7A4F7" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p>{addon}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="process-section" aria-labelledby="process-title">
          <img src="/MASCOT-15.png" alt="Process Mascot 1" className="process-mascot step1" />
          <img src="/MASCOT-20.png" alt="Process Mascot 3" className="process-mascot step3" />
          <h2 id="process-title">Our Process</h2>
          <div className="process-steps">
            {[
              { step: "1", title: "Connect", desc: "We start with a conversation about your vision and goals." },
              { step: "2", title: "Create", desc: "I dive into strategy and design, keeping you involved along the way." },
              { step: "3", title: "Deliver", desc: "You receive everything you need to launch with clarity and confidence." }
            ].map((step, index) => (
              <div key={index} className="process-step" role="article">
                <div className="step-number" aria-hidden="true">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="cta-section" aria-labelledby="cta-title">
          <div className="cta-content">
            <h2 id="cta-title">Want the Full Picture?</h2>
            <p>Everything you need to know — packages, pricing, and FAQs — all in one file.</p>
            <Link to="/" className="cta-button" role="button">
              Grab the Guide Here
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};


export default Services;

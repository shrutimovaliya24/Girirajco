'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Icon from '../components/Icon';
import NeedHelp from '../components/NeedHelp';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function ContactUsPage() {
  const { t } = useTranslation();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: contactInfoRef, isVisible: contactInfoVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation({ threshold: 0.2 });

  // Check if form was just submitted
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === '1') {
      alert(t('contactUs.thankYou'));
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [t]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t('contactUs.nameRequired') as string)
      .min(2, t('contactUs.nameMinLength') as string),
    contact: Yup.string()
      .required(t('contactUs.contactRequired') as string)
      .matches(/^[0-9]{10}$/, t('contactUs.contactInvalid') as string),
    email: Yup.string()
      .required(t('contactUs.emailRequired') as string)
      .email(t('contactUs.emailInvalid') as string),
    message: Yup.string()
      .required(t('contactUs.messageRequired') as string)
      .min(10, t('contactUs.messageMinLength') as string),
  });

  const initialValues = {
    name: '',
    contact: '',
    email: '',
    message: '',
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting, resetForm }: any) => {
    try {
      // Web3Forms - FREE, NO LIMITS, reliable, no verification needed
      // Get access key from https://web3forms.com (free, takes 30 seconds)
      const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';

      if (!WEB3FORMS_ACCESS_KEY) {
        // Web3Forms not configured - show instructions
        alert(
          'Email service not configured yet.\n\n' +
          'To enable FREE unlimited email sending:\n' +
          '1. Go to https://web3forms.com\n' +
          '2. Enter your email: info@girirajco.com\n' +
          '3. Get your free access key (takes 30 seconds)\n' +
          '4. Add to .env.local: NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key\n' +
          '5. Restart server\n\n' +
          'For now, please contact us directly at info@girirajco.com'
        );
        setSubmitting(false);
        return;
      }

      // Prepare form data for Web3Forms
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', `New Inquiry from ${values.name}`);
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('contact', values.contact);
      formData.append('message', values.message);
      formData.append('to', 'info@girirajco.com');
      formData.append('from_name', 'Giriraj Industries Contact Form');

      // Send email using Web3Forms (FREE, NO LIMITS)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // Success
        alert(t('contactUs.thankYou'));
        resetForm();
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(t('contactUs.errorMessage') + '\n\nPlease contact us directly at info@girirajco.com');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Contact Section - Redesigned */}
      <section ref={heroRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          {/* Title */}
          <div className={`text-center mb-4 sm:mb-5 md:mb-8 lg:mb-8 animate-on-scroll ${heroVisible ? 'animate-textAppear animated' : ''}`}>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
              {t('contactUs.title')}
            </h1>
            <div className="flex justify-center mb-2 sm:mb-2.5 md:mb-3">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
            <p className={`text-xs sm:text-sm md:text-sm lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-on-scroll ${heroVisible ? 'animate-textAppear animated stagger-1' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {t('contactUs.description')}
            </p>
          </div>

          {/* Two Column Layout: Left Contact Details, Right Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
            {/* Left Side - Contact Details */}
            <div>
              <div 
                ref={contactInfoRef}
                className={`bg-white rounded-xl p-5 sm:p-6 md:p-7 lg:p-8 xl:p-9 2xl:p-10 shadow-md border border-gray-200 h-full transition-all duration-300 hover:shadow-lg animate-on-scroll ${contactInfoVisible ? 'animate-slideInFromLeft animated' : ''}`}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>{t('contactUs.contactInformation')}</h2>
                
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3 sm:gap-3 md:gap-4">
                    <div className="w-10 h-10 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#5FAA3F' }}>
                      <Icon name="location" className="w-5 h-5 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xs sm:text-xs md:text-sm lg:text-base text-gray-900 mb-1.5 sm:mb-2 md:mb-2.5" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>{t('contactUs.address')}</h3>
                      <a
                        href="https://maps.app.goo.gl/QNnjn1HHTybCD3oi6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed transition-colors hover:underline block"
                      style={{ color: '#1A1A1A', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
                      >
                        {t('contactUs.addressContent')}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 sm:gap-3 md:gap-4">
                    <div className="w-10 h-10 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#5FAA3F' }}>
                      <Icon name="phone" className="w-5 h-5 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xs sm:text-xs md:text-sm lg:text-base text-gray-900 mb-1.5 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>{t('contactUs.phone')}</h3>
                      <div className="space-y-1.5 sm:space-y-2">
                        <a href="tel:+919825213536" className="text-xs sm:text-xs md:text-sm lg:text-base transition-colors block hover:underline" style={{ color: '#1A1A1A', fontFamily: 'var(--font-inter), Inter, sans-serif' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}>
                          +91 9825213536
                        </a>
                        <a href="tel:+919825213524" className="text-xs sm:text-xs md:text-sm lg:text-base transition-colors block hover:underline" style={{ color: '#1A1A1A', fontFamily: 'var(--font-inter), Inter, sans-serif' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}>
                          +91 9825213524
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 sm:gap-3 md:gap-4">
                    <div className="w-10 h-10 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#5FAA3F' }}>
                      <Icon name="mail" className="w-5 h-5 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xs sm:text-xs md:text-sm lg:text-base text-gray-900 mb-1.5 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>{t('contactUs.email')}</h3>
                      <a href="mailto:info@girirajco.com" className="text-xs sm:text-xs md:text-sm lg:text-base transition-colors hover:underline" style={{ color: '#1A1A1A', fontFamily: 'var(--font-inter), Inter, sans-serif' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}>
                        info@girirajco.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <div 
                ref={formRef}
                className={`bg-white rounded-xl p-5 sm:p-6 md:p-7 lg:p-8 xl:p-9 2xl:p-10 shadow-md border border-gray-200 h-full transition-all duration-300 hover:shadow-lg animate-on-scroll ${formVisible ? 'animate-slideInFromLeft animated stagger-2' : ''}`}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>{t('contactUs.sendMessage')}</h2>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form className="space-y-3 sm:space-y-4 md:space-y-5">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm sm:text-xs md:text-sm font-medium text-gray-700 mb-2 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          {t('contactUs.name')} <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className={`w-full px-4 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 text-sm sm:text-xs md:text-sm lg:text-base border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors min-h-[44px] ${
                            errors.name && touched.name
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-[#5FAA3F] focus:border-[#5FAA3F]'
                          }`}
                          placeholder={t('contactUs.namePlaceholder')}
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        />
                        <ErrorMessage name="name">
                          {(msg) => <p className="mt-1 sm:mt-1.5 text-xs sm:text-xs md:text-sm text-red-500" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{msg}</p>}
                        </ErrorMessage>
                      </div>

                      {/* Contact Field */}
                      <div>
                        <label htmlFor="contact" className="block text-sm sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 mb-2 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          {t('contactUs.contactNumber')} <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="tel"
                          id="contact"
                          name="contact"
                          maxLength={10}
                          className={`w-full px-4 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 text-sm sm:text-xs md:text-sm lg:text-base border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors min-h-[44px] ${
                            errors.contact && touched.contact
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-[#5FAA3F] focus:border-[#5FAA3F]'
                          }`}
                          placeholder={t('contactUs.contactPlaceholder')}
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        />
                        <ErrorMessage name="contact">
                          {(msg) => <p className="mt-1 sm:mt-1.5 text-xs sm:text-xs md:text-sm text-red-500" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{msg}</p>}
                        </ErrorMessage>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 mb-2 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          {t('contactUs.email')} <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className={`w-full px-4 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 text-sm sm:text-xs md:text-sm lg:text-base border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors min-h-[44px] ${
                            errors.email && touched.email
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-[#5FAA3F] focus:border-[#5FAA3F]'
                          }`}
                          placeholder={t('contactUs.emailPlaceholder')}
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        />
                        <ErrorMessage name="email">
                          {(msg) => <p className="mt-1 sm:mt-1.5 text-xs sm:text-xs md:text-sm text-red-500" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{msg}</p>}
                        </ErrorMessage>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label htmlFor="message" className="block text-sm sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 mb-2 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          {t('contactUs.message')} <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="textarea"
                          id="message"
                          name="message"
                          rows={4}
                          className={`w-full px-4 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 text-sm sm:text-sm md:text-base lg:text-lg border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                            errors.message && touched.message
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-[#5FAA3F] focus:border-[#5FAA3F]'
                          }`}
                          placeholder={t('contactUs.messagePlaceholder')}
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        />
                        <ErrorMessage name="message">
                          {(msg) => <p className="mt-1 sm:mt-1.5 text-xs sm:text-xs md:text-sm text-red-500" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{msg}</p>}
                        </ErrorMessage>
                      </div>

                      {/* Get Inquiry Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-white px-5 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3.5 lg:px-8 lg:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-sm sm:text-sm md:text-base lg:text-base min-h-[44px]"
                        style={{ 
                          background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
                          fontFamily: 'var(--font-poppins), Poppins, sans-serif'
                        }}
                      >
                        {isSubmitting ? (
                          t('contactUs.submitting')
                        ) : (
                          <>
                            <Icon name="send" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" style={{ filter: 'brightness(0) invert(1)' }} />
                            {t('contactUs.getInquiry')}
                          </>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Google Map Section */}
      <section ref={mapRef} className="w-full mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center mb-2 sm:mb-2.5 md:mb-3 animate-on-scroll ${mapVisible ? 'animate-textAppear animated' : ''}`}
            style={{
              color: '#5FAA3F',
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              lineHeight: '1.2'
            }}
          >
            {t('contactUs.findUsHere')}
          </h2>
          <div className="flex justify-center mb-2 sm:mb-2.5">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>
          <p className={`text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed animate-on-scroll ${mapVisible ? 'animate-textAppear animated stagger-1' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {t('contactUs.findUsDescription')}
          </p>
        </div>

        <div className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 animate-on-scroll ${mapVisible ? 'animate-textAppear animated stagger-2' : ''}`}>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ height: '500px' }}>
            {/* Map iframe with red marker - using place name to show red pin with company name label */}
            <iframe
              title="Giriraj Industries Location"
              src="https://www.google.com/maps?q=Giriraj+industries,+628%2F5,+Vav+Gam,+Pasodara+Gam+To,+Patiya+Road,+Kamrej,+Pasodara,+Surat,+Gujarat+395013&output=embed&hl=en"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className="border-0 w-full"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Information Overlay Card - Top Left (like regreenfire.com) */}
            <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-xl p-3 sm:p-4 max-w-[280px] border border-gray-200">
              <h3 className="font-bold text-sm sm:text-base mb-1.5 text-gray-900" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                Giriraj Industries
              </h3>
              <p className="text-xs text-gray-700 mb-2 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                {t('contactUs.addressContent')}
              </p>
              <div className="flex flex-col gap-1.5">
                <a
                  href="https://maps.app.goo.gl/QNnjn1HHTybCD3oi6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs hover:underline inline-flex items-center gap-1"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {t('contactUs.viewLargerMap')}
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=21.259478480466073,72.99968947523762"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs hover:underline inline-flex items-center gap-1"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {t('contactUs.directions')}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Get Direction Button - Spaced from bottom */}
          <div className="text-center mt-10 sm:mt-12 md:mt-16 mb-6 sm:mb-8">
            <a
              href="https://maps.app.goo.gl/QNnjn1HHTybCD3oi6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 lg:px-8 lg:py-4 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-base"
              style={{
                background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
                fontFamily: 'var(--font-poppins), Poppins, sans-serif'
              }}
            >
              {t('contactUs.getDirection')}
            </a>
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <NeedHelp />
    </div>
  );
}


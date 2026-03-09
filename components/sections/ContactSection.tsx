'use client'

import { useState, useEffect } from 'react'
import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function ContactSection({ title, description, email, phone, address, formTitle, id, backgroundImage }: SectionProps) {
  const bgImageUrl = backgroundImage ? urlForImage(backgroundImage).width(1600).height(900).url() : null
  const hasContactInfo = email || phone || address

  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: string } | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState<{ valid: boolean; discountType?: string; discountValue?: number } | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const WORKER_URL = "https://mentoria-payment-worker.ur-subdomain.workers.dev" // User will update this

  useEffect(() => {
    const handlePackageSelection = (e: any) => {
      setSelectedPackage(e.detail)
    }
    window.addEventListener('package-selected', handlePackageSelection)

    // Load Razorpay Script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      window.removeEventListener('package-selected', handlePackageSelection)
    }
  }, [])

  const applyCoupon = async () => {
    if (!couponCode) return
    setIsApplyingCoupon(true)
    try {
      const response = await fetch(`${WORKER_URL}/validate-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode }),
      })
      const data = await response.json()
      setDiscount(data)
    } catch (error) {
      console.error('Error applying coupon:', error)
      setDiscount({ valid: false })
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const calculateFinalPrice = () => {
    if (!selectedPackage) return 0
    let price = parseInt(selectedPackage.price.replace(/,/g, ''))
    if (discount?.valid) {
      if (discount.discountType === 'percentage' && discount.discountValue) {
        price = Math.round(price * (1 - discount.discountValue / 100))
      } else if (discount.discountType === 'fixed' && discount.discountValue) {
        price = Math.max(0, price - discount.discountValue)
      }
    }
    return price
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPackage) {
      alert('Please select a package first')
      return
    }

    setIsProcessing(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    try {
      // 1. Create Order via Worker
      const orderResponse = await fetch(`${WORKER_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: calculateFinalPrice() * 100, // paise
          currency: 'INR',
          couponCode: discount?.valid ? couponCode : null,
          receipt: `rcpt_${Date.now()}`,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.id) {
        throw new Error('Failed to create order')
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: 'rzp_live_ZDRBsLXKmZI6Gu', // Provided by user
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Mentoria Packages',
        description: `Payment for ${selectedPackage.name}`,
        order_id: orderData.id,
        prefill: {
          name: name,
          email: email,
        },
        handler: function (response: any) {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id)
          // Here you would typically verify the payment on the server
          // and send the confirmation email.
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false)
          },
        },
        theme: {
          color: '#3399cc',
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Payment Error:', error)
      alert('Something went wrong with the payment process.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section
      id={id}
      className="contact-section"
      style={{
        padding: '80px 20px',
        backgroundColor: 'var(--color-surface)',
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Optional overlay if background image is present */}
      {bgImageUrl && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 0,
          }}
        />
      )}
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {title && (
          <h2 style={{ fontSize: '3rem', marginBottom: '10px', textAlign: 'center', color: 'var(--color-primary)', fontWeight: '700' }}>
            {title}
          </h2>
        )}
        {description && (
          <p style={{ fontSize: '1.1rem', marginBottom: '60px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            {description}
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: hasContactInfo ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
            gap: '40px',
            maxWidth: hasContactInfo ? '1200px' : '600px',
            margin: '0 auto',
          }}
        >
          {/* Contact Information - Only show if we have contact details */}
          {hasContactInfo && (
            <div
              style={{
                backgroundColor: 'var(--color-background)',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h3 style={{ fontSize: '1.75rem', marginBottom: '30px', color: 'var(--color-text-primary)', fontWeight: '600' }}>Get in Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {email && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</strong>
                    <a
                      href={`mailto:${email}`}
                      style={{
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        transition: 'opacity 0.2s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {email}
                    </a>
                  </div>
                )}
                {phone && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</strong>
                    <a
                      href={`tel:${phone}`}
                      style={{
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        transition: 'opacity 0.2s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {address && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Address</strong>
                    <p style={{ color: 'var(--color-text-primary)', margin: 0, lineHeight: '1.6', fontSize: '1.1rem' }}>
                      {address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div
            style={{
              backgroundColor: 'var(--color-background)',
              padding: '40px',
              borderRadius: '16px',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            {formTitle && <h3 style={{ fontSize: '1.75rem', marginBottom: '30px', color: 'var(--color-text-primary)', fontWeight: '600' }}>{formTitle}</h3>}

            {selectedPackage && (
              <div style={{
                backgroundColor: 'rgba(var(--color-primary-rgb), 0.05)',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid var(--color-primary)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600' }}>Selected: {selectedPackage.name}</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>₹{calculateFinalPrice().toLocaleString()}</span>
                </div>
                {discount?.valid && (
                  <div style={{ fontSize: '0.85rem', color: 'green', marginTop: '5px' }}>
                    Coupon applied! Original price: ₹{selectedPackage.price}
                  </div>
                )}
              </div>
            )}

            <form
              onSubmit={handlePayment}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                style={{
                  padding: '16px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  outline: 'none',
                }}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                style={{
                  padding: '16px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  outline: 'none',
                }}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '16px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={isApplyingCoupon || !couponCode}
                  style={{
                    padding: '0 20px',
                    backgroundColor: 'white',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-primary)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    opacity: isApplyingCoupon ? 0.5 : 1
                  }}
                >
                  {isApplyingCoupon ? '...' : 'Apply'}
                </button>
              </div>

              {discount && !discount.valid && (
                <div style={{ color: 'red', fontSize: '0.85rem' }}>Invalid coupon code</div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-background)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  marginTop: '10px',
                  transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  opacity: isProcessing ? 0.7 : 1
                }}
              >
                {isProcessing ? 'Processing...' : selectedPackage ? `Pay ₹${calculateFinalPrice().toLocaleString()}` : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}



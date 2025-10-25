import { useState } from 'react'
import './BookingModal.css'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSlots: Array<{ date: string, time: string }>
}

const BookingModal = ({ isOpen, onClose, selectedSlots }: BookingModalProps) => {
  const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'account'>('phone')
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    name: '',
    loginEmail: '',
    password: '',
    isSignUp: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for booking submission logic
    console.log('Booking submitted with:', { contactMethod, formData, selectedSlots })
    alert('Booking request submitted! (This is a placeholder)')
    onClose()
  }

  const formatSlotDateTime = (slot: { date: string, time: string }) => {
    const date = new Date(slot.date)
    return `${date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })} at ${slot.time}`
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Complete Your Booking</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="booking-summary">
          <h3>Selected Time Slots:</h3>
          <div className="selected-slots">
            {selectedSlots.map((slot, index) => (
              <div key={index} className="slot-item">
                📅 {formatSlotDateTime(slot)}
              </div>
            ))}
          </div>
        </div>

        <div className="contact-method-selector">
          <h3>How would you like us to contact you?</h3>
          <div className="method-buttons">
            <button 
              className={`method-btn ${contactMethod === 'phone' ? 'active' : ''}`}
              onClick={() => setContactMethod('phone')}
            >
              📞 Phone
            </button>
            <button 
              className={`method-btn ${contactMethod === 'email' ? 'active' : ''}`}
              onClick={() => setContactMethod('email')}
            >
              📧 Email
            </button>
            <button 
              className={`method-btn ${contactMethod === 'account' ? 'active' : ''}`}
              onClick={() => setContactMethod('account')}
            >
              👤 Account
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          {contactMethod === 'phone' && (
            <div className="form-section">
              <h4>📞 Phone Contact</h4>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          )}

          {contactMethod === 'email' && (
            <div className="form-section">
              <h4>📧 Email Contact</h4>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
          )}

          {contactMethod === 'account' && (
            <div className="form-section">
              <h4>👤 {formData.isSignUp ? 'Create Account' : 'Login'}</h4>
              
              <div className="account-toggle">
                <button 
                  type="button"
                  className={`toggle-btn ${!formData.isSignUp ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, isSignUp: false})}
                >
                  Login
                </button>
                <button 
                  type="button"
                  className={`toggle-btn ${formData.isSignUp ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, isSignUp: true})}
                >
                  Sign Up
                </button>
              </div>

              {formData.isSignUp && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="loginEmail">Email Address</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  value={formData.loginEmail}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn">
              {contactMethod === 'phone' ? 'Request Call' :
               contactMethod === 'email' ? 'Send Request' :
               formData.isSignUp ? 'Create & Book' : 'Login & Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingModal
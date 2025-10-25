import './ContactInfoModal.css'

interface ContactInfoModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSlots: Array<{ date: string, time: string }>
  preferredLanguage: string
}

const ContactInfoModal = ({ 
  isOpen, 
  onClose, 
  selectedSlots, 
  preferredLanguage 
}: ContactInfoModalProps) => {
  const formatSlotDateTime = (slot: { date: string, time: string }) => {
    const date = new Date(slot.date)
    return `${date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })} at ${slot.time}`
  }

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type} copied to clipboard!`)
    }).catch(() => {
      alert(`Failed to copy ${type}. Please copy manually.`)
    })
  }

  if (!isOpen) return null

  return (
    <div className="contact-info-overlay" onClick={onClose}>
      <div className="contact-info-content" onClick={(e) => e.stopPropagation()}>
        <div className="contact-info-header">
          <h2>Contact Information</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="booking-summary">
          <h3>Your Selected Time Slots:</h3>
          <div className="selected-slots">
            {selectedSlots.map((slot, index) => (
              <div key={index} className="slot-item">
                📅 {formatSlotDateTime(slot)}
              </div>
            ))}
          </div>
          <div className="language-info">
            <span className="language-label">Preferred Language:</span>
            <span className="language-value">{preferredLanguage}</span>
          </div>
        </div>

        <div className="contact-methods-info">
          <div className="contact-method">
            <div className="method-header">
              <div className="method-icon">📞</div>
              <h3>Call Us</h3>
            </div>
            <div className="contact-details">
              <div className="contact-item">
                <span className="label">Phone Number:</span>
                <div className="value-with-copy">
                  <span className="value">(555) 123-CLEAN</span>
                  <button 
                    className="copy-btn"
                    onClick={() => handleCopyToClipboard('(555) 123-CLEAN', 'Phone number')}
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
              <div className="contact-item">
                <span className="label">Availability:</span>
                <span className="value">24/7 Service Available</span>
              </div>
            </div>
          </div>

          <div className="contact-method">
            <div className="method-header">
              <div className="method-icon">📧</div>
              <h3>Email Us</h3>
            </div>
            <div className="contact-details">
              <div className="contact-item">
                <span className="label">Email Address:</span>
                <div className="value-with-copy">
                  <span className="value">OuiCleanMontreal@gmail.com</span>
                  <button 
                    className="copy-btn"
                    onClick={() => handleCopyToClipboard('OuiCleanMontreal@gmail.com', 'Email address')}
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
              <div className="contact-item">
                <span className="label">Response Time:</span>
                <span className="value">Within 30 minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="important-info">
          <h4>📝 When contacting us</h4>
          <ul>
            <li>Mention your preferred time slots</li>
            <li>Reference your preferred language: <strong>{preferredLanguage}</strong></li>
            <li>Have your address ready</li>
          </ul>
        </div>

        <div className="contact-info-actions">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
          <button 
            className="call-now-btn"
            onClick={() => window.open('tel:(555)123-2534', '_self')}
          >
            📞 Call Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactInfoModal
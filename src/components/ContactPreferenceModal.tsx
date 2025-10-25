import { useState } from 'react'
import './ContactPreferenceModal.css'

interface ContactPreferenceModalProps {
  isOpen: boolean
  onClose: () => void
  onContactMethodSelected: (method: 'call-us' | 'call-me', language: string) => void
  selectedSlots: Array<{ date: string, time: string }>
}

const ContactPreferenceModal = ({ 
  isOpen, 
  onClose, 
  onContactMethodSelected, 
  selectedSlots 
}: ContactPreferenceModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'call-us' | 'call-me' | null>(null)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English'])

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => {
      if (prev.includes(language)) {
        // Don't allow removing the last language
        if (prev.length === 1) return prev
        return prev.filter(lang => lang !== language)
      } else {
        return [...prev, language]
      }
    })
  }

  const handleContinue = () => {
    if (selectedMethod) {
      onContactMethodSelected(selectedMethod, selectedLanguages.join(', '))
    }
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
    <div className="preference-modal-overlay" onClick={onClose}>
      <div className="preference-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="preference-modal-header">
          <h2>Contact Preferences</h2>
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

        <div className="preference-section">
          <h3>How would you like to connect with us?</h3>
          <div className="contact-methods">
            <div 
              className={`method-card ${selectedMethod === 'call-us' ? 'selected' : ''}`}
              onClick={() => setSelectedMethod('call-us')}
            >
              <div className="method-icon">📞</div>
              <h4>I'll Call You</h4>
              <p>Get our contact information and call us directly at your convenience</p>
            </div>

            <div 
              className={`method-card ${selectedMethod === 'call-me' ? 'selected' : ''}`}
              onClick={() => setSelectedMethod('call-me')}
            >
              <div className="method-icon">📱</div>
              <h4>Call Me Back</h4>
              <p>Provide your details and we'll contact you to confirm your booking</p>
            </div>
          </div>
        </div>

        <div className="language-section">
          <h3>Preferred Language(s)</h3>
          <div className="language-buttons">
            <button 
              className={`language-btn ${selectedLanguages.includes('English') ? 'selected' : ''}`}
              onClick={() => toggleLanguage('English')}
            >
              English
            </button>
            <button 
              className={`language-btn ${selectedLanguages.includes('French') ? 'selected' : ''}`}
              onClick={() => toggleLanguage('French')}
            >
              Français
            </button>
          </div>
        </div>

        <div className="preference-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className={`continue-btn ${selectedMethod ? 'enabled' : 'disabled'}`}
            onClick={handleContinue}
            disabled={!selectedMethod}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactPreferenceModal
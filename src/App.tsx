import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Calendar from './components/Calendar'
import ContactPreferenceModal from './components/ContactPreferenceModal'
import ContactInfoModal from './components/ContactInfoModal'
import BookingModal from './components/BookingModal'

function App() {
  const [selectedSlots, setSelectedSlots] = useState<Array<{ date: string, time: string }>>([])
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false)
  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [preferredLanguage, setPreferredLanguage] = useState('')

  const handleTimeSlotSelect = (date: Date, time: string, isCurrentlySelected: boolean) => {
    const dateString = date.toDateString()
    
    if (isCurrentlySelected) {
      // Remove the slot from selection
      setSelectedSlots(prev => 
        prev.filter(slot => !(slot.date === dateString && slot.time === time))
      )
      console.log(`Unselected: ${dateString} at ${time}`)
    } else {
      // Add the slot to selection
      setSelectedSlots(prev => [...prev, { date: dateString, time }])
      console.log(`Selected: ${dateString} at ${time}`)
    }
  }

  const handleConfirmBooking = () => {
    setIsPreferenceModalOpen(true)
  }

  const handleContactMethodSelected = (method: 'call-us' | 'call-me', language: string) => {
    setPreferredLanguage(language)
    setIsPreferenceModalOpen(false)
    
    if (method === 'call-us') {
      setIsContactInfoModalOpen(true)
    } else {
      setIsBookingModalOpen(true)
    }
  }

  const handleCloseAllModals = () => {
    setIsPreferenceModalOpen(false)
    setIsContactInfoModalOpen(false)
    setIsBookingModalOpen(false)
  }

  // Remove unavailable dates since all dates are available
  
  return (
    <>
      <Header />
      <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
        <div style={{ 
          padding: '2rem',
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          minHeight: 'calc(100vh - 70px)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              color: '#1e40af', 
              marginBottom: '1rem',
              fontWeight: '700'
            }}>
              Book Your Cleaning Service
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#1e3a8a',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Select your preferred date and time for our professional cleaning service
            </p>
          </div>
          
          <Calendar 
            onTimeSlotSelect={handleTimeSlotSelect}
            selectedSlots={selectedSlots}
          />
          
          {/* Fixed floating confirm button */}
          {selectedSlots.length > 0 && (
            <button 
              onClick={handleConfirmBooking}
              className="floating-confirm-btn"
            >
              <span>📅</span>
              Confirm Booking ({selectedSlots.length})
            </button>
          )}
        </div>
      </main>
      
      <ContactPreferenceModal
        isOpen={isPreferenceModalOpen}
        onClose={handleCloseAllModals}
        onContactMethodSelected={handleContactMethodSelected}
        selectedSlots={selectedSlots}
      />
      
      <ContactInfoModal
        isOpen={isContactInfoModalOpen}
        onClose={handleCloseAllModals}
        selectedSlots={selectedSlots}
        preferredLanguage={preferredLanguage}
      />
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseAllModals}
        selectedSlots={selectedSlots}
      />
    </>
  )
}

export default App
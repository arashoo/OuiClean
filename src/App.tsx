import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Calendar from './components/Calendar'

function App() {
  const [selectedSlots, setSelectedSlots] = useState<Array<{ date: string, time: string }>>([])

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

  // Remove unavailable dates since all dates are available
  
  return (
    <>
      <Header />
      <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
        <div style={{ 
          padding: '2rem',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          minHeight: 'calc(100vh - 70px)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              color: '#2c5530', 
              marginBottom: '1rem',
              fontWeight: '700'
            }}>
              Book Your Cleaning Service
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#666',
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
          
          <div style={{ 
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            {selectedSlots.length > 0 && (
              <button 
                style={{ 
                  padding: '0.75rem 2rem', 
                  fontSize: '1.1rem',
                  background: '#2c5530',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Confirm Booking ({selectedSlots.length} slot{selectedSlots.length > 1 ? 's' : ''})
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
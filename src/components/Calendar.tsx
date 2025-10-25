import { useState, useEffect } from 'react'
import './Calendar.css'

interface TimeSlot {
  time: string
  available: boolean
}

interface CalendarProps {
  onTimeSlotSelect?: (date: Date, time: string, isSelected: boolean) => void
  selectedSlots?: Array<{ date: string, time: string }>
}

const Calendar = ({ 
  onTimeSlotSelect, 
  selectedSlots = []
}: CalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1200)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Generate time slots from 6AM to 12AM (midnight) in 3-hour intervals
  const timeSlots: TimeSlot[] = [
    { time: '6:00 AM', available: true },
    { time: '9:00 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '6:00 PM', available: true },
    { time: '9:00 PM', available: true },
    { time: '12:00 AM', available: true },
  ]

  // Get the start of the week (Sunday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day
    return new Date(d.setDate(diff))
  }

  // Generate days for the current week (7 for desktop, 3 for mobile)
  const getWeekDays = () => {
    const weekStart = getWeekStart(currentWeek)
    const days = []
    const numDays = isSmallScreen ? 3 : 7
    
    for (let i = 0; i < numDays; i++) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + i)
      days.push(date)
    }
    
    return days
  }

  const weekDays = getWeekDays()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek)
    const daysToMove = isSmallScreen ? 3 : 7
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? daysToMove : -daysToMove))
    setCurrentWeek(newDate)
  }

  const isDateUnavailable = (_date: Date) => {
    // All dates are available unless they are past dates
    return false
  }

  const isSlotSelected = (date: Date, time: string) => {
    return selectedSlots.some(slot => 
      slot.date === date.toDateString() && slot.time === time
    )
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const handleTimeSlotClick = (date: Date, time: string) => {
    if (!isPastDate(date)) {
      const isCurrentlySelected = isSlotSelected(date, time)
      onTimeSlotSelect?.(date, time, isCurrentlySelected)
    }
  }

  const formatDateHeader = (dates: Date[]) => {
    if (dates.length === 0) return ''
    
    const firstDate = dates[0]
    const lastDate = dates[dates.length - 1]
    
    const firstMonth = monthNames[firstDate.getMonth()]
    const lastMonth = monthNames[lastDate.getMonth()]
    const firstYear = firstDate.getFullYear()
    const lastYear = lastDate.getFullYear()
    
    if (isSmallScreen) {
      // For 3-day view, show the range more compactly
      if (firstMonth === lastMonth && firstYear === lastYear) {
        return `${firstMonth} ${firstDate.getDate()}-${lastDate.getDate()}, ${firstYear}`
      } else {
        return `${firstMonth} ${firstDate.getDate()} - ${lastMonth} ${lastDate.getDate()}, ${firstYear}`
      }
    } else {
      // For 7-day view, show full range
      if (firstYear === lastYear) {
        return `${firstMonth} - ${lastMonth} ${firstYear}`
      } else {
        return `${firstMonth} ${firstYear} - ${lastMonth} ${lastYear}`
      }
    }
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button 
          className="nav-button"
          onClick={() => navigateWeek('prev')}
          aria-label={isSmallScreen ? "Previous 3 days" : "Previous week"}
        >
          ←
        </button>
        <h3 className="calendar-title">
          {formatDateHeader(weekDays)}
        </h3>
        <button 
          className="nav-button"
          onClick={() => navigateWeek('next')}
          aria-label={isSmallScreen ? "Next 3 days" : "Next week"}
        >
          →
        </button>
      </div>

      <div className="calendar-grid">
        {/* Header with days */}
        <div className="time-column-header"></div>
        {weekDays.map((date, index) => (
          <div key={index} className="day-header">
            <div className="day-name">{dayNames[index]}</div>
            <div className={`day-number ${isPastDate(date) ? 'past' : ''}`}>
              {date.getDate()}
            </div>
          </div>
        ))}

        {/* Time slots grid */}
        {timeSlots.map((slot, timeIndex) => (
          <div key={timeIndex} className="time-row">
            <div className="time-label">{slot.time}</div>
            {weekDays.map((date, dayIndex) => {
              const isUnavailable = isDateUnavailable(date)
              const isPast = isPastDate(date)
              const isSelected = isSlotSelected(date, slot.time)
              
              return (
                <div
                  key={`${timeIndex}-${dayIndex}`}
                  className={`time-slot ${isPast ? 'past' : ''} ${isUnavailable ? 'unavailable' : ''} ${isSelected ? 'selected' : ''} ${slot.available && !isPast && !isUnavailable ? 'available' : ''}`}
                  onClick={() => handleTimeSlotClick(date, slot.time)}
                >
                  {isSelected && <span className="selected-indicator">✓</span>}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color past"></div>
          <span>Past</span>
        </div>
        <div className="legend-item">
          <div className="legend-color selected"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  )
}

export default Calendar
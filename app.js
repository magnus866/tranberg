/**
 * Tranberg Institut AB - Booking Engine
 * Only runs on pages where booking elements are present (/boka.html and /index.html)
 */
document.addEventListener('DOMContentLoaded', () => {

  // Guard: Only execute if booking calendar exists on this page
  const calendarDaysContainer = document.getElementById('calendar-days-container');
  if (!calendarDaysContainer) return;

  const calendarMonthYear = document.getElementById('calendar-month-year');
  const prevMonthBtn = document.getElementById('prev-month-btn');
  const nextMonthBtn = document.getElementById('next-month-btn');
  const selectedDateText = document.getElementById('selected-date-text');
  const timeslotsContainer = document.getElementById('timeslots-container');
  const bookingFormSection = document.getElementById('booking-form-section');
  const summaryDatetime = document.getElementById('summary-datetime');
  const formDateInput = document.getElementById('form-date');
  const formTimeInput = document.getElementById('form-time');
  const appointmentForm = document.getElementById('appointment-form');
  const bookingStatusOverlay = document.getElementById('booking-status-overlay');
  const statusTitle = document.getElementById('status-title');
  const statusDesc = document.getElementById('status-desc');
  const bookingSuccessMessage = document.getElementById('booking-success-message');
  const successType = document.getElementById('success-type');
  const successTime = document.getElementById('success-time');
  const bookAnotherBtn = document.getElementById('book-another-btn');

  // Step selection controls
  const bookingTypeSelect = document.getElementById('booking-type');
  const bookingGridArea = document.getElementById('booking-grid-area');

  // Working Hours
  const START_HOUR = 8;
  const END_HOUR = 15;

  // Date State
  let currentDate = new Date();
  let selectedDate = null;
  let selectedTime = null; // String "HH:MM"

  // Swedish locale helpers
  const swedishDays = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  const swedishMonths = ['januari', 'februari', 'mars', 'april', 'maj', 'juni',
                         'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

  function formatDateString(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function formatReadableSwedishDate(date) {
    return `${swedishDays[date.getDay()]} ${date.getDate()} ${swedishMonths[date.getMonth()]}`;
  }

  function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  }

  // Load and sanitize bookings (no mock data)
  let bookingsDB = {};
  try {
    const stored = localStorage.getItem('tranberg_bookings');
    if (stored) {
      const parsed = JSON.parse(stored);
      let isOldFormat = false;
      for (const k in parsed) {
        if (Array.isArray(parsed[k])) {
          // If the array contains numbers instead of objects, it's the old mock format
          if (parsed[k].length > 0 && typeof parsed[k][0] === 'number') {
            isOldFormat = true;
            break;
          }
        }
      }
      if (!isOldFormat) {
        bookingsDB = parsed;
      } else {
        console.warn("Gammalt bokningsformat upptäckt i localStorage. Rensar för att undvika fel.");
        localStorage.removeItem('tranberg_bookings');
      }
    }
  } catch (e) {
    console.error("Kunde inte läsa bokningar från localStorage:", e);
  }

  function getBookingsForDate(dateString) {
    return bookingsDB[dateString] || [];
  }

  // Checks if a new booking interval overlaps with any existing bookings on that date
  function checkOverlap(dateStr, newStartMinutes, totalDurationMinutes) {
    const bookings = getBookingsForDate(dateStr);
    const newEndMinutes = newStartMinutes + totalDurationMinutes;

    for (const b of bookings) {
      const bStart = timeToMinutes(b.start);
      const bEnd = bStart + b.duration + 15; // treatment duration + 15 min write-up

      if (newStartMinutes < bEnd && bStart < newEndMinutes) {
        return true; // Overlap detected!
      }
    }
    return false;
  }

  // Checks if a date has at least one valid starting hour for the selected duration
  function hasAvailableSlotsForDate(dateStr, durationVal) {
    const totalDuration = durationVal + 15;
    for (let h = START_HOUR; h <= END_HOUR; h++) {
      const startMins = h * 60;
      if (!checkOverlap(dateStr, startMins, totalDuration)) {
        return true;
      }
    }
    return false;
  }

  // Handle flow transitions based on selection of treatment
  function handleServiceSelectionChange() {
    const typeSelected = bookingTypeSelect.value;

    if (typeSelected) {
      bookingGridArea.classList.remove('disabled');
      // Reset selections to avoid inconsistent states on change
      selectedDate = null;
      selectedTime = null;
      selectedDateText.textContent = 'Välj en dag i kalendern till vänster';
      timeslotsContainer.classList.add('empty');
      timeslotsContainer.innerHTML = '<p class="helper-text">Vänligen klicka på en tillgänglig dag först.</p>';
      bookingFormSection.classList.add('disabled');
      formDateInput.value = '';
      formTimeInput.value = '';
      renderCalendar();
    } else {
      bookingGridArea.classList.add('disabled');
      bookingFormSection.classList.add('disabled');
      selectedDate = null;
      selectedTime = null;
      formDateInput.value = '';
      formTimeInput.value = '';
    }
  }

  bookingTypeSelect.addEventListener('change', handleServiceSelectionChange);

  // Calendar Rendering
  function renderCalendar() {
    calendarDaysContainer.innerHTML = '';
    calendarMonthYear.textContent = `${swedishMonths[currentDate.getMonth()].toUpperCase()} ${currentDate.getFullYear()}`;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const durationVal = parseInt(bookingTypeSelect.value, 10) || 60;

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const tempDate = new Date(year, month, d);
      const dow = tempDate.getDay();
      if (dow === 0 || dow === 6) continue; // Skip weekends

      const dateStr = formatDateString(tempDate);
      const isPast = tempDate < today;
      
      // A day is unavailable if it is in the past OR has no available timeslots
      const dayAvailable = !isPast && hasAvailableSlotsForDate(dateStr, durationVal);

      const btn = document.createElement('button');
      btn.className = 'calendar-day-btn';
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', formatReadableSwedishDate(tempDate));

      // First weekday of month: set grid-column-start
      if (d === 1 && dow >= 1 && dow <= 5) {
        btn.style.gridColumnStart = dow;
      }

      const numSpan = document.createElement('span');
      numSpan.textContent = d;
      btn.appendChild(numSpan);

      const dot = document.createElement('span');
      dot.className = `day-status-dot ${dayAvailable ? 'available' : 'unavailable'}`;
      btn.appendChild(dot);

      if (!dayAvailable) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.calendar-day-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectDate(tempDate, dateStr);
        });
      }

      if (selectedDate && formatDateString(selectedDate) === dateStr) {
        btn.classList.add('selected');
      }

      calendarDaysContainer.appendChild(btn);
    }
  }

  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  function selectDate(date, dateStr) {
    selectedDate = date;
    selectedTime = null;
    selectedDateText.textContent = formatReadableSwedishDate(date);
    timeslotsContainer.classList.remove('empty');
    timeslotsContainer.innerHTML = '';
    bookingFormSection.classList.add('disabled');
    formDateInput.value = '';
    formTimeInput.value = '';

    const durationVal = parseInt(bookingTypeSelect.value, 10) || 60;
    const totalDuration = durationVal + 15;

    for (let h = START_HOUR; h <= END_HOUR; h++) {
      const timeStr = `${String(h).padStart(2, '0')}:00`;
      const startMins = h * 60;
      const isOverlapping = checkOverlap(dateStr, startMins, totalDuration);

      const btn = document.createElement('button');
      btn.className = 'timeslot-btn';
      btn.setAttribute('type', 'button');

      const timeSpan = document.createElement('span');
      timeSpan.className = 'slot-time';
      timeSpan.textContent = timeStr;

      const statusSpan = document.createElement('span');
      statusSpan.className = 'slot-status';
      statusSpan.textContent = isOverlapping ? 'Upptagen' : 'Ledig';

      if (isOverlapping) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.timeslot-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectTime(timeStr);
        });
      }

      btn.appendChild(timeSpan);
      btn.appendChild(statusSpan);
      timeslotsContainer.appendChild(btn);
    }
  }

  function selectTime(timeStr) {
    selectedTime = timeStr;
    formDateInput.value = formatDateString(selectedDate);
    formTimeInput.value = timeStr;
    summaryDatetime.textContent = `${formatReadableSwedishDate(selectedDate)} kl. ${timeStr}`;
    bookingFormSection.classList.remove('disabled');
    bookingFormSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = bookingTypeSelect.options[bookingTypeSelect.selectedIndex].text;
      const durationVal = parseInt(bookingTypeSelect.value, 10);

      if (!document.getElementById('gdpr-consent').checked) {
        alert('Du måste godkänna GDPR-villkoren för att boka.');
        return;
      }

      bookingStatusOverlay.classList.remove('hidden');

      setTimeout(() => {
        statusTitle.textContent = 'Genererar AES-256 kryptering...';
        statusDesc.textContent = 'Säkrar personuppgifter och patientbeskrivning.';
        setTimeout(() => {
          statusTitle.textContent = 'Skickar krypterad API-request...';
          statusDesc.textContent = 'Kopplar upp mot magnus@houseofkroon.se...';
          setTimeout(() => {
            bookingStatusOverlay.classList.add('hidden');

            const dateStr = formatDateString(selectedDate);
            if (!bookingsDB[dateStr]) bookingsDB[dateStr] = [];
            bookingsDB[dateStr].push({
              start: selectedTime,
              duration: durationVal,
              type: type,
              name: document.getElementById('client-name').value
            });
            localStorage.setItem('tranberg_bookings', JSON.stringify(bookingsDB));

            bookingFormSection.classList.add('disabled');
            document.querySelector('.booking-grid').classList.add('hidden');
            bookingSuccessMessage.classList.remove('hidden');
            successType.textContent = type;
            successTime.textContent = `${formatReadableSwedishDate(selectedDate)} kl. ${selectedTime}`;
            renderCalendar();
            bookingSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 1500);
        }, 1200);
      }, 1000);
    });
  }

  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener('click', () => {
      appointmentForm.reset();
      bookingTypeSelect.selectedIndex = 0;
      handleServiceSelectionChange();
      document.querySelector('.booking-grid').classList.remove('hidden');
      bookingSuccessMessage.classList.add('hidden');
      renderCalendar();
    });
  }

  // Initial call on load
  handleServiceSelectionChange();
});

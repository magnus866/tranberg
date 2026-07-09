/**
 * Tranberg Institut AB - Booking Engine
 * Only runs on /boka.html where booking elements are present
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

  // Working Hours
  const START_HOUR = 8;
  const END_HOUR = 15;

  // Date State
  let currentDate = new Date();
  let selectedDate = null;
  let selectedTime = null;

  // Mock Bookings (persisted locally, GDPR-safe anonymous)
  let bookingsDB = JSON.parse(localStorage.getItem('tranberg_bookings')) || {};

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

  // Deterministic pre-booked hours per date (to simulate existing bookings realistically)
  function getPrebookedHours(dateString) {
    const hash = dateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const numBooked = 2 + (hash % 3);
    const available = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);
    const booked = [];
    for (let i = 0; i < numBooked; i++) {
      const idx = (hash + i * 3) % available.length;
      booked.push(available.splice(idx, 1)[0]);
    }
    return booked.sort((a, b) => a - b);
  }

  function getBookingsForDate(dateString) {
    const pre = getPrebookedHours(dateString);
    const user = bookingsDB[dateString] || [];
    return [...new Set([...pre, ...user])];
  }

  // Calendar Rendering
  function renderCalendar() {
    calendarDaysContainer.innerHTML = '';
    calendarMonthYear.textContent = `${swedishMonths[currentDate.getMonth()].toUpperCase()} ${currentDate.getFullYear()}`;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const tempDate = new Date(year, month, d);
      const dow = tempDate.getDay();
      if (dow === 0 || dow === 6) continue; // Skip weekends

      const dateStr = formatDateString(tempDate);
      const isPast = tempDate < today;
      const allSlots = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);
      const booked = getBookingsForDate(dateStr);
      const fullyBooked = booked.length >= allSlots.length;

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
      dot.className = `day-status-dot ${isPast || fullyBooked ? 'unavailable' : 'available'}`;
      btn.appendChild(dot);

      if (isPast || fullyBooked) {
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

    const booked = getBookingsForDate(dateStr);

    for (let h = START_HOUR; h <= END_HOUR; h++) {
      const timeStr = `${String(h).padStart(2, '0')}:00`;
      const isBooked = booked.includes(h);

      const btn = document.createElement('button');
      btn.className = 'timeslot-btn';
      btn.setAttribute('type', 'button');

      const timeSpan = document.createElement('span');
      timeSpan.className = 'slot-time';
      timeSpan.textContent = timeStr;

      const statusSpan = document.createElement('span');
      statusSpan.className = 'slot-status';
      statusSpan.textContent = isBooked ? 'Upptagen' : 'Ledig';

      if (isBooked) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.timeslot-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectTime(timeStr, h);
        });
      }

      btn.appendChild(timeSpan);
      btn.appendChild(statusSpan);
      timeslotsContainer.appendChild(btn);
    }
  }

  function selectTime(timeStr, hourInt) {
    selectedTime = hourInt;
    formDateInput.value = formatDateString(selectedDate);
    formTimeInput.value = timeStr;
    summaryDatetime.textContent = `${formatReadableSwedishDate(selectedDate)} kl. ${timeStr}`;
    bookingFormSection.classList.remove('disabled');
    bookingFormSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const typeEl = document.getElementById('booking-type');
      const type = typeEl.options[typeEl.selectedIndex].text;
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
            bookingsDB[dateStr].push(selectedTime);
            localStorage.setItem('tranberg_bookings', JSON.stringify(bookingsDB));

            bookingFormSection.classList.add('disabled');
            document.querySelector('.booking-grid').classList.add('hidden');
            bookingSuccessMessage.classList.remove('hidden');
            successType.textContent = type;
            successTime.textContent = `${formatReadableSwedishDate(selectedDate)} kl. ${String(selectedTime).padStart(2, '0')}:00`;
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
      selectedDate = null;
      selectedTime = null;
      document.querySelector('.booking-grid').classList.remove('hidden');
      bookingSuccessMessage.classList.add('hidden');
      timeslotsContainer.classList.add('empty');
      timeslotsContainer.innerHTML = '<p class="helper-text">Vänligen klicka på en tillgänglig dag först.</p>';
      selectedDateText.textContent = 'Välj en dag i kalendern till vänster';
      bookingFormSection.classList.add('disabled');
      renderCalendar();
    });
  }

  renderCalendar();
});

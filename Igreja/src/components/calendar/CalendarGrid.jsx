import React from 'react';
import { DAYS_OF_WEEK } from '../../constants';

/**
 * Grade do calendário mensal.
 * @param {number} year
 * @param {number} month - 0-indexed
 * @param {Array} events - lista de eventos
 * @param {function} onDayClick - (dateString) => void
 * @param {function} onEventClick - (event) => void
 */
const CalendarGrid = ({ year, month, events, onDayClick, onEventClick }) => {
  const today = new Date();

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfWeek = (y, m) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const daysInPrev = getDaysInMonth(year, month - 1);

  const allDays = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    allDays.push({ day: daysInPrev - i, thisMonth: false, date: new Date(year, month - 1, daysInPrev - i) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    allDays.push({ day: d, thisMonth: true, date: new Date(year, month, d) });
  }
  const remaining = 42 - allDays.length;
  for (let d = 1; d <= remaining; d++) {
    allDays.push({ day: d, thisMonth: false, date: new Date(year, month + 1, d) });
  }

  const eventsForDate = (date) => {
    const ds = date.toISOString().split('T')[0];
    return events.filter((e) => e.date === ds);
  };

  return (
    <div className="calendar-grid">
      {DAYS_OF_WEEK.map((d) => <div key={d} className="cal-header">{d}</div>)}

      {allDays.map((dayObj, i) => {
        const dayEvents = eventsForDate(dayObj.date);
        const isToday =
          dayObj.thisMonth &&
          dayObj.day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();

        return (
          <div
            key={i}
            className={`cal-day${!dayObj.thisMonth ? ' other-month' : ''}${isToday ? ' today' : ''}`}
            onClick={() => dayObj.thisMonth && onDayClick(dayObj.date.toISOString().split('T')[0])}
          >
            <div className="day-num">{dayObj.day}</div>
            {dayEvents.slice(0, 2).map((ev) => (
              <div
                key={ev.id}
                className={`cal-event ${ev.category}`}
                onClick={(e) => { e.stopPropagation(); onEventClick(ev); }}
              >
                {ev.time} {ev.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="more-events">+{dayEvents.length - 2} mais</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
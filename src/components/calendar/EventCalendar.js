import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function EventCalendar(props) {
  const { calendarData, initialDate } = props;

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={false}
      initialView="dayGridMonth"
      contentHeight="600px"
      events={calendarData}
      initialDate={initialDate}
      editable
      minHeight="400px"
      height="100%"
      slotWidth={10}
      customIcons={false}
    />
  );
}

export default EventCalendar;

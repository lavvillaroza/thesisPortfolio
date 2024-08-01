import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

const CustomCalendar: React.FC = () => {
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [date, setDate] = useState<Value>(new Date());

  return (
    <div className="p-4 m-auto ">
      <Calendar
        onChange={setDate}
        value={date}
        className="border border-gray-300 rounded-md p-2 focus:outline-none "
      />
    </div>
  );
};

export default CustomCalendar;
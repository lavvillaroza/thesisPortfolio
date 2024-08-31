import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'; // Import custom icons

const CustomCalendar: React.FC = () => {
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [date, setDate] = useState<Value>(new Date());

  return (
    <div className="mx-auto max-w-lg">
      <Calendar
        onChange={setDate}
        value={date}
        className="border border-gray-300 shadow-xl rounded-md p-2 w-full focus:outline-none "
        prev2Label={<FaAngleDoubleLeft />}  // Custom double previous button icon
        prevLabel={<FaAngleLeft />}         // Custom previous button icon
        nextLabel={<FaAngleRight />}        // Custom next button icon
        next2Label={<FaAngleDoubleRight />} // Custom double next button icon
      />
    </div>
  );
};

export default CustomCalendar;
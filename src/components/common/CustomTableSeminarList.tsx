import { useState, ChangeEvent } from 'react';

interface Attendees {
  email: string;
  status: boolean;  // Updated to boolean
}

interface TableProps {
  data: Attendees[];
}

const CustomTableSeminarList: React.FC<TableProps> = ({ data }) => {
  
  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendees, setAttendees] = useState(data);  // Local state for the attendees data

  // Filter data based on search term
  const filteredData = attendees.filter(attendee =>
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredData.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const handleCheckboxChange = (index: number) => {
    // Update the status of the attendee in the local state
    const updatedAttendees = [...attendees];
    const attendeeIndex = startIndex + index; // Index in the full list
    updatedAttendees[attendeeIndex].status = !updatedAttendees[attendeeIndex].status;
    setAttendees(updatedAttendees);
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="overflow-auto">
        <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">     
          <div className="flex-1"></div>
          <div className="flex-shrink-0">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for Names"
              />
            </div>
          </div>                   
        </div>

        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Student Email</th>
              <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Status</th>                            
            </tr>
          </thead>
          <tbody>
            {currentRows.map((attendee, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-700">{attendee.email}</td>
                <td className="py-2 px-4 text-gray-700">
                  <input
                    type="checkbox"
                    checked={attendee.status}
                    onChange={() => handleCheckboxChange(index)}  // Handle checkbox change
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                </td>                    
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={handlePrevious} 
          className="px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={handleNext} 
          className="px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CustomTableSeminarList;

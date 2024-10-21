import { Link } from 'react-router-dom';
import React, { useState, ChangeEvent } from 'react';
import { StudentDetailModel } from '../models/StudentDetailModel';

interface TableProps {
  data: StudentDetailModel[];
}

const CustomTableStudentList: React.FC<TableProps> = ({ data }) => {
  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(''); // For course filter
  const [selectedYearLevel, setSelectedYearLevel] = useState(''); // For year level filter
  const [selectedSection, setSelectedSection] = useState(''); // For section filter

  // Get unique courses, year levels, and sections for the filters
  const uniqueCourses = Array.from(new Set(data.map(student => student.course)));
  const uniqueYearLevels = Array.from(new Set(data.map(student => student.yearLevel)));
  const uniqueSections = Array.from(new Set(data.map(student => student.section)));

  // Filter data based on search term, course, year level, and section
  const filteredData = data
    .filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCourse ? student.course === selectedCourse : true) &&
      (selectedYearLevel ? student.yearLevel === selectedYearLevel : true) &&
      (selectedSection ? student.section === selectedSection : true)
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

  const handleCourseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handleYearLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYearLevel(event.target.value);
    setCurrentPage(1);
  };

  const handleSectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="overflow-auto">
        {/* Filter Options */}
        <div className="flex flex-col gap-4 sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          {/* Search Input */}
          <div className="flex-1">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative">
              <input
                type="text"
                id="table-search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
                placeholder="Search for Names"
              />
            </div>
          </div>

          {/* Course Filter */}
          <div className="flex-shrink-0">
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            >
              <option value="">All Courses</option>
              {uniqueCourses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>

          {/* Year Level Filter */}
          <div className="flex-shrink-0">
            <select
              value={selectedYearLevel}
              onChange={handleYearLevelChange}
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            >
              <option value="">All Year Levels</option>
              {uniqueYearLevels.map((yearLevel, index) => (
                <option key={index} value={yearLevel}>{yearLevel}</option>
              ))}
            </select>
          </div>

          {/* Section Filter */}
          <div className="flex-shrink-0">
            <select
              value={selectedSection}
              onChange={handleSectionChange}
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            >
              <option value="">All Sections</option>
              {uniqueSections.map((section, index) => (
                <option key={index} value={section}>{section}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Name</th>
              <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Course</th>
              <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Year Level</th>
              <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Section</th>
              <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-700">{student.name}</td>
                <td className="py-2 px-4 text-gray-700">{student.course}</td>
                <td className="py-2 px-4 text-gray-700">{student.yearLevel}</td>
                <td className="py-2 px-4 text-gray-700">{student.section}</td>
                <td className="py-2 px-4 text-gray-700">
                  <Link to="/student/information" className="px-4 py-2 text-sm text-green-700 hover:bg-gray-200 hover:text-gray-900">
                    View Portfolio
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

export default CustomTableStudentList;

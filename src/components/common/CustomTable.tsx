import React from 'react';

interface Subject {
    name: string;
    description: string;
    prereq: string;
    lec: number;
    lab: number;
    units: number;
  }

interface YearData {
    year: string;
    subjects: Subject[];
  }

interface TableProps {
  data: YearData[];
}

const CustomTable: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="overflow-auto">
      {data.map((yearData) => (
        <div key={yearData.year} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{yearData.year} YEAR</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Name</th>
                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Description</th>
                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Prerequisite</th>
                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Lecture</th>
                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Lab</th>
                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Units</th>
              </tr>
            </thead>
            <tbody>
              {yearData.subjects.map((subject, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-700">{subject.name}</td>
                  <td className="py-2 px-4 text-gray-700">{subject.description}</td>
                  <td className="py-2 px-4 text-gray-700">{subject.prereq}</td>
                  <td className="py-2 px-4 text-gray-700">{subject.lec}</td>
                  <td className="py-2 px-4 text-gray-700">{subject.lab}</td>
                  <td className="py-2 px-4 text-gray-700">{subject.units}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CustomTable;
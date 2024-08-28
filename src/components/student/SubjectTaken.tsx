import React from 'react';
import Profile from './Profile';
import Navbar from './Navbar';
import CustomTable from '../common/CustomTable';

const subjectTakenData = [
  {year: '1ST', subjects:  [
      { name: 'GE 008', description: 'Ethics', prereq: 'None', lec: 3, lab: 0, units: 3},
      { name: 'GEE 002', description: 'GE Elective 2 (Living in the IT Era)', prereq: 'None', lec: 3, lab: 0, units: 3},
      { name: 'COMP 104', description: 'Data Structures and Algorithms', prereq: 'None', lec: 2, lab: 1, units: 3},
      { name: 'COMP 105', description: 'Information Management', prereq: 'None', lec: 2, lab: 1, units: 3},
      { name: 'IT 102', description: 'Quantitative Methods', prereq: 'None', lec: 3, lab: 0, units: 3},
      { name: 'IT 201', description: 'IT Elective Platform Technologies', prereq: 'None', lec: 2, lab: 1, units: 3},
      { name: 'IT 202', description: 'IT Elective Object-Oriented Programming (VB.Net)', prereq: 'None', lec: 2, lab: 1, units: 3},
      { name: 'PE 103', description: 'Data Structures and Algorithms', prereq: 'None', lec: 2, lab: 0, units: 2},
    ]
  },  
  {year: '2ND', subjects:  [
    { name: 'GE 008', description: 'Ethics', prereq: 'None', lec: 3, lab: 0, units: 3},
    { name: 'GEE 002', description: 'GE Elective 2 (Living in the IT Era)', prereq: 'None', lec: 3, lab: 0, units: 3},
    { name: 'COMP 104', description: 'Data Structures and Algorithms', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'COMP 105', description: 'Information Management', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'IT 102', description: 'Quantitative Methods', prereq: 'None', lec: 3, lab: 0, units: 3},
    { name: 'IT 201', description: 'IT Elective Platform Technologies', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'IT 202', description: 'IT Elective Object-Oriented Programming (VB.Net)', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'PE 103', description: 'Data Structures and Algorithms', prereq: 'None', lec: 2, lab: 0, units: 2},
  ]
  },  
  {year: '3RD', subjects:  [
    { name: 'GE 008', description: 'Ethics', prereq: 'None', lec: 3, lab: 0, units: 3},
    { name: 'GEE 002', description: 'GE Elective 2 (Living in the IT Era)', prereq: 'None', lec: 3, lab: 0, units: 3},
    { name: 'COMP 104', description: 'Data Structures and Algorithms', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'COMP 105', description: 'Information Management', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'IT 102', description: 'Quantitative Methods', prereq: 'None', lec: 3, lab: 0, units: 3},
    { name: 'IT 201', description: 'IT Elective Platform Technologies', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'IT 202', description: 'IT Elective Object-Oriented Programming (VB.Net)', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'PE 103', description: 'Data Structures and Algorithms', prereq: 'None', lec: 2, lab: 0, units: 2},
  ]
  },  
  {year: '4TH', subjects:  [
    { name: 'GE 008', description: 'Ethics', prereq: 'None', lec: 3, lab: 0, units: 3},
    { name: 'GEE 002', description: 'GE Elective 2 (Living in the IT Era)', prereq: 'None', lec: 3, lab: 0, units: 3},
    { name: 'COMP 104', description: 'Data Structures and Algorithms', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'COMP 105', description: 'Information Management', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'IT 102', description: 'Quantitative Methods', prereq: 'None', lec: 3, lab: 0, units: 3},
    { name: 'IT 201', description: 'IT Elective Platform Technologies', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'IT 202', description: 'IT Elective Object-Oriented Programming (VB.Net)', prereq: 'None', lec: 2, lab: 1, units: 3},
    { name: 'PE 103', description: 'Data Structures and Algorithms', prereq: 'None', lec: 2, lab: 0, units: 2},
  ]
  },  
];

const SubjectTaken: React.FC = () => {
  return (
    <>
      <div className="bg-gray-200 h-svh py-6">  
        <Profile />           
        <Navbar />
        <div className="container mx-auto w-8/12 h-[600px] bg-green-700 bg-gradient-to-br from-emerald-600 ">        
          <div className="h-[60px] p-4">
            <div className='mb-4'>
              <p className="text-gray-50 text-left m-2 hover:text-green-700 text-2xl">PROGRAM OF STUDY</p>   
            </div>            
            <div  className='p-4 w-full m-auto  h-[500px] bg-white drop-shadow-md rounded-lg overflow-auto col-span-3'>                  
              <div className="container mx-auto p-4">                
                <CustomTable data={subjectTakenData} />
              </div>
            </div>  
          </div>  
        </div>
      </div>
    </>  
    )
};

export default SubjectTaken;
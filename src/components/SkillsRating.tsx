import React from 'react';

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

const SkillsRating: React.FC<StarProps> = ({ filled, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={`w-4 h-4 cursor-pointer ${filled ? 'text-gray-500' : 'text-gray-200'}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 .587l3.668 7.451L24 9.26l-6 5.827 1.416 8.258L12 18.613l-7.416 4.732L6 15.087.002 9.26l8.332-1.222z"
      />
    </svg>
  );
};

export default SkillsRating;
import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  key: string | number;
  value: string;
}

interface SearchBarDropdownProps {
  items: DropdownItem[];
  placeholder?: string;
  onItemSelected?: (item: DropdownItem) => void;
}

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({
  items,
  placeholder = 'Search...',
  onItemSelected,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState<DropdownItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter items based on the input
  useEffect(() => {
    if (searchInput.trim() === '') {
      setFilteredItems([]);
      setIsDropdownOpen(false);
    } else {
      const filtered = items.filter((item) =>
        item.value.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredItems(filtered);
      setIsDropdownOpen(filtered.length > 0);
    }
  }, [searchInput, items]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen) return;

    if (e.key === 'ArrowDown') {
      setActiveIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1
      );
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < filteredItems.length) {
        selectItem(filteredItems[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  // Select an item
  const selectItem = (item: DropdownItem) => {
    setSearchInput(item.value);
    setIsDropdownOpen(false);
    if (onItemSelected) {
      onItemSelected(item);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full md:w-1/2" ref={dropdownRef}>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isDropdownOpen && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md z-50 max-h-60 w-full overflow-auto"
        >
          {filteredItems.map((item, index) => (
            <li
              key={item.key}
              onClick={() => selectItem(item)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`px-4 py-2 cursor-pointer ${
                activeIndex === index
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarDropdown;

import React from "react";

interface FilterSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterValue: string;
  onFilterChange: (filter: string) => void;
  placeholder?: string;
  options: string[];
}

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  placeholder = "Search schedules...",
  options,
}) => {
  const styles = {
    border: "border-gray-300",
    inputFocus:
      "focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
  };

  return (
    <div className="mb-4 flex flex-wrap gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`flex-1 px-4 py-2 rounded-md border ${styles.border} ${styles.inputFocus} bg-transparent`}
      />
      {/* Filter Dropdown */}
      <select
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        className={`px-4 py-2 rounded-md border ${styles.border} ${styles.inputFocus} bg-transparent`}
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSearchBar;

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface GoalFiltersProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    priority: string;
    status: string;
  }) => void;
}

export default function GoalFilters({ onFilterChange }: GoalFiltersProps) {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priority: '',
    status: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const selectClassName = "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search goals..."
          className="pl-10 bg-white text-gray-900 border-gray-300"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <select
          className={selectClassName}
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
          <option value="Health">Health</option>
          <option value="Financial">Financial</option>
        </select>
        <select
          className={selectClassName}
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          className={selectClassName}
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
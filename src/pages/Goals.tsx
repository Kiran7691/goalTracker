import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Goal } from '../types/goals';
import GoalList from '../components/goals/GoalList';
import GoalFilters from '../components/goals/GoalFilters';
import CreateGoalModal from '../components/goals/CreateGoalModal';
import GoalDetails from '../components/goals/GoalDetails';

export default function Goals() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priority: '',
    status: '',
  });

  const { data: goals = [], refetch } = useQuery({
    queryKey: ['goals', filters],
    queryFn: async () => {
      let query = supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleGoalUpdate = () => {
    refetch();
    if (selectedGoal) {
      // Refresh the selected goal data
      const updatedGoal = goals.find(g => g.id === selectedGoal.id);
      if (updatedGoal) {
        setSelectedGoal(updatedGoal);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Goals</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </button>
      </div>

      <GoalFilters onFilterChange={setFilters} />

      <GoalList 
        goals={goals} 
        onGoalClick={(goal) => setSelectedGoal(goal)}
      />

      {isCreateModalOpen && (
        <CreateGoalModal
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            refetch();
          }}
        />
      )}

      {selectedGoal && (
        <GoalDetails
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onEdit={() => {/* Implement edit functionality */}}
          onDelete={() => {
            setSelectedGoal(null);
            refetch();
          }}
          onStatusChange={handleGoalUpdate}
        />
      )}
    </div>
  );
}
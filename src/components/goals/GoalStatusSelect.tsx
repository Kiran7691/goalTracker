import { supabase } from '../../lib/supabase';
import { Goal } from '../../types/goals';
import { toast } from '../ui/use-toast';

interface GoalStatusSelectProps {
  goal: Goal;
  onStatusChange: () => void;
}

export default function GoalStatusSelect({ goal, onStatusChange }: GoalStatusSelectProps) {
  const handleStatusChange = async (newStatus: Goal['status']) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({ status: newStatus })
        .eq('id', goal.id);

      if (error) throw error;

      toast({
        title: 'Status updated',
        description: `Goal status changed to ${newStatus}`,
      });

      onStatusChange();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <select
      value={goal.status}
      onChange={(e) => handleStatusChange(e.target.value as Goal['status'])}
      className="rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-1 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
    >
      <option value="Not Started" className="text-gray-900">Not Started</option>
      <option value="In Progress" className="text-gray-900">In Progress</option>
      <option value="Completed" className="text-gray-900">Completed</option>
    </select>
  );
}
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { toast } from '../ui/use-toast';
import { Goal } from '../../types/goals';
import { supabase } from '../../lib/supabase';

interface GoalActionsProps {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
}

export default function GoalActions({ goal, onEdit, onDelete }: GoalActionsProps) {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this goal?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goal.id);

      if (error) throw error;
      
      toast({
        title: 'Goal deleted',
        description: 'The goal has been successfully deleted.',
      });
      
      onDelete();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the goal. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted">
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Edit2 className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
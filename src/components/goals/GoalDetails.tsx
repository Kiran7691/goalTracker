import { format } from 'date-fns';
import { Calendar, Flag, ListTodo } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Goal } from '../../types/goals';
import GoalActions from './GoalActions';
import GoalNotes from './GoalNotes';
import GoalStatusSelect from './GoalStatusSelect';

interface GoalDetailsProps {
  goal: Goal;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
}

export default function GoalDetails({ 
  goal, 
  onClose, 
  onEdit, 
  onDelete,
  onStatusChange 
}: GoalDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
          <CardTitle className="text-gray-900">{goal.title}</CardTitle>
          <div className="flex items-center gap-2">
            <GoalActions 
              goal={goal}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Description</h3>
            <p className="text-gray-600">{goal.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">Priority: {goal.priority}</span>
            </div>
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-green-600" />
              <GoalStatusSelect goal={goal} onStatusChange={onStatusChange} />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">
                Due: {format(new Date(goal.due_date), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <GoalNotes goalId={goal.id} initialNotes={goal.notes} />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Timeline</h3>
            <div className="relative pt-2">
              <div className="absolute left-2.5 h-full w-px bg-gray-200" />
              <div className="space-y-4">
                <div className="relative flex items-center pl-8">
                  <div className="absolute left-0 h-5 w-5 rounded-full border-2 border-green-600 bg-white" />
                  <span className="text-sm text-gray-600">Goal Created</span>
                  <span className="ml-auto text-sm text-gray-500">
                    {format(new Date(goal.created_at), 'MMM dd, yyyy')}
                  </span>
                </div>
                {goal.status !== 'Not Started' && (
                  <div className="relative flex items-center pl-8">
                    <div className="absolute left-0 h-5 w-5 rounded-full border-2 border-green-600 bg-white" />
                    <span className="text-sm text-gray-600">Started Working</span>
                  </div>
                )}
                {goal.status === 'Completed' && (
                  <div className="relative flex items-center pl-8">
                    <div className="absolute left-0 h-5 w-5 rounded-full border-2 border-green-600 bg-green-600" />
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
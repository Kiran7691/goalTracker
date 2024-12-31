import { format } from 'date-fns';
import { CheckCircle2, Circle, Timer, Calendar, Flag } from 'lucide-react';
import { Goal } from '../../types/goals';
import { Card, CardContent } from '../ui/card';

const statusIcons = {
  'Not Started': Circle,
  'In Progress': Timer,
  'Completed': CheckCircle2,
};

const statusStyles = {
  'Not Started': {
    bg: 'bg-gray-100',
    text: 'text-gray-900',
    icon: 'text-gray-600'
  },
  'In Progress': {
    bg: 'bg-blue-100',
    text: 'text-blue-900',
    icon: 'text-blue-600'
  },
  'Completed': {
    bg: 'bg-green-100',
    text: 'text-green-900',
    icon: 'text-green-600'
  },
};

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
}

export default function GoalCard({ goal, onClick }: GoalCardProps) {
  const StatusIcon = statusIcons[goal.status];
  const statusStyle = statusStyles[goal.status];

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer bg-white border-gray-200"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${statusStyle.bg}`}>
              <StatusIcon className={`h-5 w-5 ${statusStyle.icon}`} />
            </div>
            <span className={`text-sm font-medium ${statusStyle.text}`}>
              {goal.status}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium
            ${goal.priority === 'High' ? 'bg-red-100 text-red-900' : 
              goal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-900' : 
              'bg-green-100 text-green-900'}`}>
            {goal.priority}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
        
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center text-sm">
            <Flag className="h-4 w-4 mr-2 text-gray-500" />
            <span>{goal.category}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Due {format(new Date(goal.due_date), 'MMM dd, yyyy')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
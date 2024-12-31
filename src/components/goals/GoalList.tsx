import { Goal } from '../../types/goals';
import GoalCard from './GoalCard';

interface GoalListProps {
  goals: Goal[];
  onGoalClick: (goal: Goal) => void;
}

export default function GoalList({ goals, onGoalClick }: GoalListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onClick={() => onGoalClick(goal)}
        />
      ))}
    </div>
  );
}
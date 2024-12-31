import { Target, Trophy, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
}

function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <span className="text-xs text-muted-foreground">{description}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface QuickStatsProps {
  totalGoals: number;
  completedGoals: number;
  inProgressGoals: number;
}

export default function QuickStats({ totalGoals, completedGoals, inProgressGoals }: QuickStatsProps) {
  return (
    <>
      <StatCard
        title="Total Goals"
        value={totalGoals}
        icon={Target}
        description="goals set"
      />
      <StatCard
        title="Completed"
        value={completedGoals}
        icon={Trophy}
        description="goals achieved"
      />
      <StatCard
        title="In Progress"
        value={inProgressGoals}
        icon={Clock}
        description="active goals"
      />
    </>
  );
}
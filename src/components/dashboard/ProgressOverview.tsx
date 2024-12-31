import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

interface ProgressOverviewProps {
  completed: number;
  total: number;
}

export default function ProgressOverview({ completed, total }: ProgressOverviewProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Overall Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-muted/20 stroke-current"
              strokeWidth="8"
              fill="none"
              r="38"
              cx="50"
              cy="50"
            />
            <circle
              className="text-primary stroke-current"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              r="38"
              cx="50"
              cy="50"
              strokeDasharray={`${percentage * 2.4}, 240`}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold">{percentage}%</span>
            <span className="text-sm text-muted-foreground">Complete</span>
          </div>
        </div>
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{completed}/{total} Goals</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
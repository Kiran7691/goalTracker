import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import ProgressOverview from '../components/dashboard/ProgressOverview';
import QuickStats from '../components/dashboard/QuickStats';
import MotivationalQuote from '../components/dashboard/MotivationalQuote';
import { getUserDisplayName } from '../lib/utils';

export default function Dashboard() {
  const { user } = useAuth();
  const displayName = getUserDisplayName(user);

  const { data: goals = [] } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  const completedGoals = goals.filter(g => g.status === 'Completed').length;
  const inProgressGoals = goals.filter(g => g.status === 'In Progress').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-black">
          {displayName}'s Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here's your progress overview.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <QuickStats
          totalGoals={goals.length}
          completedGoals={completedGoals}
          inProgressGoals={inProgressGoals}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-4">
          <ProgressOverview
            completed={completedGoals}
            total={goals.length}
          />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <MotivationalQuote />
        </div>
      </div>
    </div>
  );
}
export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: 'Personal' | 'Professional' | 'Health' | 'Financial';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed';
  due_date: string;
  created_at: string;
  updated_at: string;
  notes?: string;
}
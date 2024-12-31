import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/use-toast';
import { supabase } from '../../lib/supabase';

interface GoalNotesProps {
  goalId: string;
  initialNotes?: string | null;
}

export default function GoalNotes({ goalId, initialNotes }: GoalNotesProps) {
  const [notes, setNotes] = useState(initialNotes || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('goals')
        .update({ notes })
        .eq('id', goalId);

      if (error) throw error;

      setIsEditing(false);
      toast({
        title: 'Notes saved',
        description: 'Your notes have been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save notes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900">Notes</h3>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit Notes
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        )}
      </div>

      {isEditing ? (
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about your goal..."
          className="min-h-[200px] text-gray-900 bg-white placeholder:text-gray-500"
        />
      ) : (
        <div className="bg-white rounded-md p-4 min-h-[100px] text-gray-900">
          {notes ? (
            <p className="whitespace-pre-wrap">{notes}</p>
          ) : (
            <p className="text-gray-500">No notes added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
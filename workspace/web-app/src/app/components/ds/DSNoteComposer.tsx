import * as React from 'react';
import { Textarea } from '../ui/textarea';
import { DSButton } from './DSButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '../ui/utils';

interface DSNoteComposerProps {
  onSubmit: (note: string, scope: string) => void;
  scopes?: string[];
  placeholder?: string;
  className?: string;
}

export function DSNoteComposer({
  onSubmit,
  scopes = ['General', 'Transaction', 'Search', 'Listing'],
  placeholder = 'Add a note...',
  className,
}: DSNoteComposerProps) {
  const [note, setNote] = React.useState('');
  const [scope, setScope] = React.useState(scopes[0]);

  const handleSubmit = () => {
    if (note.trim()) {
      onSubmit(note, scope);
      setNote('');
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <Textarea
        placeholder={placeholder}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="min-h-[80px]"
      />
      <div className="flex items-center justify-between gap-3">
        <Select value={scope} onValueChange={setScope}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {scopes.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DSButton onClick={handleSubmit} disabled={!note.trim()}>
          Add Note
        </DSButton>
      </div>
    </div>
  );
}

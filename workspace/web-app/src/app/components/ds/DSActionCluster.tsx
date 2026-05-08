import * as React from 'react';
import { Plus, Upload, MoreVertical } from 'lucide-react';
import { DSIconButton } from './DSIconButton';
import { cn } from '../ui/utils';

interface DSActionClusterProps {
  onAdd?: () => void;
  onUpload?: () => void;
  onMore?: () => void;
  className?: string;
}

export function DSActionCluster({ onAdd, onUpload, onMore, className }: DSActionClusterProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {onAdd && <DSIconButton icon={<Plus className="h-4 w-4" />} label="Add" onClick={onAdd} />}
      {onUpload && <DSIconButton icon={<Upload className="h-4 w-4" />} label="Upload" onClick={onUpload} />}
      {onMore && <DSIconButton icon={<MoreVertical className="h-4 w-4" />} label="More" onClick={onMore} />}
    </div>
  );
}

'use client';

import { ClipboardCopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  return (
    <Button
      className="border"
      variant="secondary"
      size="icon"
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success('Copied link to clipboard!');
      }}
    >
      <ClipboardCopyIcon className="size-4" />
    </Button>
  );
}

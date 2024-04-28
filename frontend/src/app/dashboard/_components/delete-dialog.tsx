'use client';

import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteMeeting } from '../_actions';

interface DeleteDialogProps {
  meetingId: string;
}

export function DeleteDialog({ meetingId }: DeleteDialogProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteMeeting(meetingId);
    toast.success('Meeting deleted!');
    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the notes
            for this meeting.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="w-full bg-red-500 hover:bg-red-400"
            onClick={handleDelete}
          >
            Yes, I&apos;m sure
          </AlertDialogAction>
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

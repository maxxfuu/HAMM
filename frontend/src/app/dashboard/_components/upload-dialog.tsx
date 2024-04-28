'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PaperclipIcon, PlusIcon, TagIcon, UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  meetingName: z.string().trim().min(1),
  patientName: z.string().trim().min(1),
  file: z.instanceof(File, { message: 'Please upload a file!' })
});

export function UploadDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingName: '',
      patientName: ''
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const formData = new FormData();
    formData.append('meeting_name', values.meetingName);
    formData.append('patient_name', values.patientName);
    formData.append('file', values.file);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error('Bad response from server');
    }

    console.log('res', response);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 size-4" /> Upload new meeting
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className="contents"
            onSubmit={form.handleSubmit((values) =>
              toast.promise(handleSubmit(values), {
                loading: 'Please wait...',
                error: 'An unexpected error occurred.',
                success: () => 'Your meeting has been submitted for processing!'
              })
            )}
          >
            <DialogHeader>
              <DialogTitle>Upload new meeting</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                name="meetingName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">
                      <TagIcon className="mr-1 size-4" /> Meeting Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Symptom evaluation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="patientName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">
                      <UserIcon className="mr-1 size-4" /> Patient Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Rick Astley" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="file"
              control={form.control}
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <FormItem>
                    <FormLabel className="flex">
                      <PaperclipIcon className="mr-1 size-4" /> File (video or
                      audio)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="file"
                        accept="audio/*,video/*"
                        onChange={(e) =>
                          onChange(e.target.files ? e.target.files[0] : null)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <DialogFooter>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

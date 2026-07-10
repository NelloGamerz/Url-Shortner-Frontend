import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useCreateLink, usePublicShorten } from '../../hooks/useApi';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  url: z.string().url('Please enter a valid URL'),
  customAlias: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface CreateLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateLinkModal({ open, onOpenChange }: CreateLinkModalProps) {
  const [generatedSlug, setGeneratedSlug] = useState<string>('');
  const { toast } = useToast();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const createLink = useCreateLink();
  const publicShorten = usePublicShorten();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const url = watch('url');

  const handleGenerateSlug = () => {
    const slug = Math.random().toString(36).substring(2, 8);
    setGeneratedSlug(slug);
    toast({
      title: 'Slug Generated',
      description: `Your custom alias: ${slug}`,
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const finalUrl = url.startsWith('http') ? url : `https://${url}`;

      if (isSignedIn) {
        await createLink.mutateAsync({
          url: finalUrl,
          customAlias: data.customAlias || generatedSlug || undefined,
        });
        toast({
          title: 'Link Created!',
          description: 'Your short link has been created successfully',
        });
      } else {
        await publicShorten.mutateAsync(finalUrl);
        toast({
          title: 'Link Created!',
          description: 'Sign in to save and track your links',
        });
      }
      reset();
      setGeneratedSlug('');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create link. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleClose = () => {
    if (!isSignedIn) {
      toast({
        title: 'Sign In Required',
        description: 'You need to sign in before creating short links.',
      });
      navigate('/sign-in');
      return;
    }
    onOpenChange(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Short Link</DialogTitle>
          <DialogDescription>
            Enter a long URL to generate a short, shareable link
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="url">Original URL</Label>
            <Input
              id="url"
              placeholder="https://example.com/very-long-url-here"
              {...register('url')}
              className={errors.url ? 'border-red-500' : ''}
            />
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customAlias">Custom Alias (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="customAlias"
                placeholder="my-custom-link"
                {...register('customAlias')}
                value={watch('customAlias') || generatedSlug}
                onChange={(e) => {
                  setGeneratedSlug('');
                  register('customAlias').onChange(e);
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateSlug}
                className="shrink-0"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Generate
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createLink.isPending || publicShorten.isPending}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {(createLink.isPending || publicShorten.isPending) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Create Link
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

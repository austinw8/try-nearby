import {
  Ban,
  Bell,
  CircleCheck,
  CircleX,
  Info,
  Loader2,
  Trash2,
  TriangleAlert,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const imgIcons: Record<NonNullable<ConfirmModalProps['img']>, React.ReactNode> = {
  success: <CircleCheck className="size-16 text-success mt-2" />,
  error: <CircleX className="size-16 text-destructive mt-2" />,
  warning: <TriangleAlert className="size-16 text-warning mt-2" />,
  info: <Info className="size-16 text-warning mt-2" />,
  delete: <Trash2 className="size-16 text-destructive mt-2" />,
  notification: <Bell className="size-16 text-primary mt-2" />,
  cancel: <Ban className="size-16 text-destructive mt-2" />,
};

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  text: string;
  subtext?: string;
  img?: 'success' | 'error' | 'warning' | 'info' | 'delete' | 'notification' | 'cancel';
  cancelText: string;
  confirmText?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  text,
  subtext,
  img,
  cancelText,
  confirmText,
  isLoading,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center text-xl">{title}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-4 items-center">
            {img && imgIcons[img]}
            <div className="text-center max-w-none prose prose-sm prose-stone">
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
            {subtext && (
              <span className="text-sm font-semibold text-center text-muted-foreground">
                {subtext}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          {confirmText && (
            <AlertDialogAction
              disabled={isLoading}
              variant={img === 'delete' || img === 'cancel' ? 'destructive' : 'default'}
              onClick={onConfirm}
            >
              {isLoading ? <Loader2 className="animate-spin size-4" /> : confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

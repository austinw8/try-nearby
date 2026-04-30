// Note: This file is not from shadcn but was copied from it's Card component.

import type * as React from 'react';

import { cn } from '@/lib/utils';

function Page({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page"
      className={cn('mx-auto flex w-full flex-1 flex-col gap-4 p-6', className)}
      {...props}
    />
  );
}

function PageHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        'gap-1 rounded-t-xl group-data-[size=sm]/page:px-3 [.border-b]:pb-4 group-data-[size=sm]/page:[.border-b]:pb-3 group/page-header @container/page-header grid auto-rows-min items-start has-data-[slot=page-action]:grid-cols-[1fr_auto] has-data-[slot=page-description]:grid-rows-[auto_auto]',
        className,
      )}
      {...props}
    />
  );
}

function PageTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-title"
      className={cn('px-6 pt-2 scroll-m-20 text-xl font-semibold', className)}
      {...props}
    />
  );
}

function PageDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-description"
      className={cn('px-6 text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function PageAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-action"
      className={cn(
        'pr-6 pt-2 col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function PageContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="page-content" className={cn('w-full px-6 pt-2', className)} {...props} />;
}

export { Page, PageHeader, PageTitle, PageAction, PageDescription, PageContent };

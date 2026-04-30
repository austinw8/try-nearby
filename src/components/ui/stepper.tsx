import { Children, type ComponentProps, cloneElement, isValidElement } from 'react';
import { cn } from '@/lib/utils';

function Stepper({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />;
}

function StepperList({
  activeStep,
  children,
  className,
  ...props
}: ComponentProps<'div'> & { activeStep: number }) {
  const count = Children.count(children);

  return (
    <div className={className} {...props}>
      <div className="mb-2 flex gap-1">
        {Array.from({ length: count }, (_, i) => (
          <div
            key={`step-bar-${i.toString()}`}
            className={cn('h-1.5 flex-1 rounded-full', i <= activeStep ? 'bg-primary' : 'bg-muted')}
          />
        ))}
      </div>
      <div className="flex justify-around text-xs text-muted-foreground">
        {Children.map(children, (child, i) =>
          isValidElement<{ active?: boolean }>(child)
            ? cloneElement(child, { active: i === activeStep })
            : child,
        )}
      </div>
    </div>
  );
}

function StepperTrigger({
  active,
  className,
  ...props
}: ComponentProps<'span'> & { active?: boolean }) {
  return <span className={cn(active && 'font-medium text-foreground', className)} {...props} />;
}

export { Stepper, StepperList, StepperTrigger };

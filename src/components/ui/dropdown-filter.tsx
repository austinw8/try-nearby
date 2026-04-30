import { Check, PlusCircle } from 'lucide-react';
import { Fragment } from 'react';
import { Badge } from './badge';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Separator } from './separator';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface Option<T extends string | number> {
  label: string;
  value: T;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

interface OptionGroup<T extends string | number> {
  key: string;
  group?: string;
  items: Array<Option<T>>;
}

interface DropdownFilterProps<T extends string | number> {
  title: string;
  options: Array<OptionGroup<T>>;
  values: Array<T>;
  onChange: (values: Array<T> | null) => void;
}

function DropdownFilter<T extends string | number>({
  title,
  options,
  values,
  onChange,
}: DropdownFilterProps<T>) {
  const isMobile = useIsMobile();

  const handleSelection = (optionValue: T) => {
    const newValues = values.includes(optionValue)
      ? values.filter((v) => v !== optionValue)
      : [...values, optionValue];
    onChange(newValues.length > 0 ? newValues : null);
  };

  const allItems = options.flatMap((g) => g.items);

  const trigger = (
    <Button variant="outline" className="border-dashed gap-1.5">
      <PlusCircle />
      {title}
      {values.length > 0 && (
        <div className="flex items-center gap-1.5">
          <Separator orientation="vertical" className="h-4" />
          <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
            {values.length}
          </Badge>
          <div className="hidden items-center gap-1 lg:flex">
            {values.length > 2 ? (
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                {values.length} selected
              </Badge>
            ) : (
              allItems
                .filter((opt) => values.includes(opt.value))
                .map((opt) => (
                  <Badge
                    variant="secondary"
                    key={String(opt.value)}
                    className="rounded-sm px-1 font-normal"
                  >
                    {opt.label}
                  </Badge>
                ))
            )}
          </div>
        </div>
      )}
    </Button>
  );

  const optionList = (
    <Command>
      <CommandInput placeholder={title} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {options.map((group, index) => {
          const sorted = [
            ...group.items.filter((o) => values.includes(o.value)),
            ...group.items.filter((o) => !values.includes(o.value)),
          ];
          return (
            <Fragment key={group.key}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={group.group}>
                {sorted.map((option) => {
                  const isSelected = values.includes(option.value);
                  return (
                    <CommandItem
                      key={String(option.value)}
                      onSelect={() => handleSelection(option.value)}
                    >
                      <div
                        className={cn(
                          'flex size-4 shrink-0 items-center justify-center rounded-sm border',
                          isSelected
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-input [&_svg]:invisible',
                        )}
                      >
                        <Check className="size-3.5" />
                      </div>
                      {option.icon && <option.icon className="text-muted-foreground" />}
                      <span>{option.label}</span>
                      {option.count !== undefined && (
                        <span className="text-muted-foreground ml-auto font-mono text-xs">
                          {option.count}
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Fragment>
          );
        })}
      </CommandList>
      {values.length > 0 && (
        <>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem onSelect={() => onChange(null)} className="justify-center text-center">
              Clear filters
            </CommandItem>
          </CommandGroup>
        </>
      )}
    </Command>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>Select an option from the list below.</DrawerDescription>
          </DrawerHeader>
          {optionList}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent className="w-50 p-0" align="start">
        {optionList}
      </PopoverContent>
    </Popover>
  );
}

export { DropdownFilter };
export type { Option, OptionGroup };

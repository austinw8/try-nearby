# CLAUDE.md

## General

- Only create an abstraction when it's actually needed.
- Prefer clear function/variable names over inline comments.
- Avoid helper functions when a simple inline expression would suffice.
- Don't use emojis.

## Framework

- Use Tanstack Start for the app framework.
- Use shadcn UI components for the frontend.
- Use Drizzle ORM for database interactions.

## File Structure

- src/
  - db/ # Drizzle database setup and schema definitions
  - routes/ # Tanstack Start file routes
  - components/ # Shared React components

## Styling

- Use tailwind css, but avoid too many custom styling classes; prefer shadcn component defaults.
- Avoid custom tailwind colors, use the colors defined as css vars in globals.css.
- We use BaseUI instead of Radix for shadcn components, so use render instead of asChild.
- Feel free to install additional shadcn components from the registry using mcp tool as needed.
- Always use semantic color tokens (`bg-primary`, `text-muted-foreground`) — never raw Tailwind colors like `bg-blue-500` or `text-emerald-600`.
- For status/state indicators, use `Badge` variants or tokens like `text-destructive` — never raw colors.
- Never add `dark:` color overrides manually — semantic tokens handle light/dark automatically via CSS variables.
- Use `gap-*` instead of `space-x-*` / `space-y-*`.
- Prefer `size-10` over `w-10 h-10` when width and height are equal.
- Use `truncate` instead of `overflow-hidden text-ellipsis whitespace-nowrap`.
- Use `cn()` from `@/lib/utils` for conditional or merged class names, not manual template literals.
- Never add manual `z-index` to overlay components (`Dialog`, `Sheet`, `Drawer`, `DropdownMenu`, `Popover`, `Tooltip`, etc.) — they manage their own stacking.

## Theming & Customization

Colors are CSS variables in `globals.css` using OKLCH (`oklch(lightness chroma hue)`). Every color follows the `name` / `name-foreground` convention — base for backgrounds, `-foreground` for text/icons on top.

| Variable                                     | Purpose                          |
| -------------------------------------------- | -------------------------------- |
| `--background` / `--foreground`              | Page background and default text |
| `--card` / `--card-foreground`               | Card surfaces                    |
| `--primary` / `--primary-foreground`         | Primary buttons and actions      |
| `--secondary` / `--secondary-foreground`     | Secondary actions                |
| `--muted` / `--muted-foreground`             | Muted/disabled states            |
| `--accent` / `--accent-foreground`           | Hover and accent states          |
| `--destructive` / `--destructive-foreground` | Error and destructive actions    |
| `--border`                                   | Default border color             |
| `--input`                                    | Form input borders               |
| `--ring`                                     | Focus ring color                 |
| `--chart-1` through `--chart-5`              | Chart/data visualization         |
| `--sidebar-*`                                | Sidebar-specific colors          |
| `--surface` / `--surface-foreground`         | Secondary surface                |

`--radius` controls border radius globally — components derive `rounded-lg`, `rounded-md`, etc. from it.

**Adding custom colors** — always in `globals.css`, never a new CSS file:

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}
.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

**Customizing components** — prefer in this order:

1. Built-in variants: `<Button variant="outline" size="sm">`
2. Layout via `className`: `<Card className="max-w-md mx-auto">` — never override colors or typography this way
3. New `cva` variant in the component source: `warning: "bg-warning text-warning-foreground hover:bg-warning/90"`
4. Wrapper component composing shadcn primitives

**Changing the theme:**

```bash
npx shadcn@latest init --preset <code> --force   # apply a preset from ui.shadcn.com
npx shadcn@latest add button --diff              # preview what would change before updating
npx shadcn@latest add button --dry-run           # see all affected files
```

## Icons

- Always import icons from the project's configured `iconLibrary` (`lucide-react`, `@tabler/icons-react`, etc.).
- Add `data-icon="inline-start"` (prefix) or `data-icon="inline-end"` (suffix) to icons inside `Button` — no sizing classes.
- Never add `size-4`, `w-4 h-4`, `mr-2`, or other sizing/spacing classes to icons inside shadcn components (`Button`, `DropdownMenuItem`, `Alert`, `Sidebar*`, etc.) — components handle icon sizing via CSS.
- Pass icons as component references (`icon={CheckIcon}`), not as string keys to a lookup map.

## Forms

- Always use `FieldGroup` + `Field` — never raw `div` with `space-y-*`:
  ```tsx
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" />
    </Field>
  </FieldGroup>
  ```
- Use `Field orientation="horizontal"` for settings pages. Use `FieldLabel className="sr-only"` for visually hidden labels.
- Choosing form controls:
  - Simple text input → `Input`
  - Dropdown with predefined options → `Select`
  - Searchable dropdown → `Combobox`
  - Boolean toggle → `Switch` (settings) or `Checkbox` (forms)
  - Single choice from few options → `RadioGroup`
  - Toggle between 2–7 options → `ToggleGroup` + `ToggleGroupItem`
  - Multi-line text → `Textarea`
  - OTP/verification code → `InputOTP`
- Always use `InputGroupInput` / `InputGroupTextarea` inside `InputGroup` — never raw `Input` or `Textarea`.
- Buttons inside inputs use `InputGroup` + `InputGroupAddon` — never `relative`/`absolute` positioning:
  ```tsx
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <Button size="icon">
        <SearchIcon data-icon="inline-start" />
      </Button>
    </InputGroupAddon>
  </InputGroup>
  ```
- Use `FieldSet` + `FieldLegend` to group related checkboxes/radios/switches — not a `div` with a heading.
- Field validation and disabled states require both the data attribute (styles label/description) and the aria/HTML attribute (styles the control):
  ```tsx
  <Field data-invalid>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" aria-invalid />
  </Field>
  ```

## Component Composition

- Items (`SelectItem`, `DropdownMenuItem`, etc.) must always be inside their Group component (`SelectGroup`, `DropdownMenuGroup`, etc.) — never directly inside the content container.
- Callouts use `Alert` + `AlertTitle` + `AlertDescription`.
- Empty states use the `Empty` component family (`EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`).
- Toast notifications use `sonner`: `toast.success(...)`, `toast.error(...)`, `toast('...', { action: ... })`.
- Choosing overlay components:
  | Use case | Component |
  | ---------------------------------- | ------------- |
  | Focused task requiring input | `Dialog` |
  | Destructive action confirmation | `AlertDialog` |
  | Side panel with details or filters | `Sheet` |
  | Mobile-first bottom panel | `Drawer` |
  | Quick info on hover | `HoverCard` |
  | Small contextual content on click | `Popover` |
- `Dialog`, `Sheet`, and `Drawer` always require a `Title` component for accessibility (use `className="sr-only"` if visually hidden).
- Use full `Card` composition (`CardHeader`, `CardContent`, `CardFooter`) — don't dump everything into `CardContent`.
- `Button` has no `isPending` or `isLoading` prop — compose with `Spinner` + `data-icon` + `disabled`:
  ```tsx
  <Button disabled>
    <Spinner data-icon="inline-start" />
    Saving...
  </Button>
  ```
- `TabsTrigger` must always be inside `TabsList`.
- `Avatar` always needs `AvatarFallback` for when the image fails to load.
- Prefer existing components over custom markup:
  | Instead of | Use |
  | -------------------------------------------------- | --------------------------------- |
  | `<hr>` or `<div className="border-t">` | `<Separator />` |
  | `<div className="animate-pulse">` with styled divs | `<Skeleton className="h-4 w-3/4" />` |
  | `<span className="rounded-full bg-green-100 ...">` | `<Badge variant="secondary">` |

## Database

- Infer zod validation models from drizzle schema definitions where possible (i.e. using `createInsertSchema` in model.ts files).
- Use separate `relations.ts` files to define relations.
- Use drizzle beta, i.e.:
  - Don't do this:
    ```
    const response = db._query.users.findMany({where: (users, { eq }) => eq(users.id, 1)});
    ```
  - Do this:
    ```
    const response = db.query.users.findMany({where: {id: 1}});
    ```
- Prefer `.query` ORM syntax over `select` syntax for most queries.
- Use query builder syntax for complex queries; use `sql\`\`` only as a last resort.

## Zod Validation Schemas

- Infer schemas from drizzle schema definitions using `createInsertSchema` / `createSelectSchema` from `drizzle-orm/zod`.
- For required string inputs, always add `.nonempty()` to prevent empty strings from being submitted.
- For number inputs, use `z.coerce.number<number>()`.

## TypeScript

- Don't unnecessarily add `try`/`catch` blocks.
- Don't cast `any`.
- Avoid custom types — infer from existing types and zod schemas.

## React

- Avoid `useEffect` when possible; prefer derived state and setting values directly in event handlers.
- Avoid `useMemo` — React Compiler handles memoization automatically.
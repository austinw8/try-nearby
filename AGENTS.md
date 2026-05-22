# AGENTS.md

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
  - routes/ # Tanstack Start file routes
  - components/ # Shared React components

## Styling

- Use tailwind css, but avoid too many custom styling classes; prefer shadcn component defaults.
- Avoid custom tailwind colors, use the colors defined as css vars in globals.css.
- We use BaseUI instead of Radix for shadcn components, so use render instead of asChild.
- Feel free to install additional shadcn components from the registry using mcp tool as needed.
- Example: don't put h-4 w-4 mr-2 on button icons. Shadcn already styles icons in buttons automatically.

## Database

- Infer zod validation models from drizzle schema definitions where possible (i.e. using `createInsertSchema` in model.ts files).
- Use separate relations.ts files to define relations.
- Use drizzle beta, i.e.:
  - Don't do this:
    ```
    const response = db._query.users.findMany({where: (users, { eq }) => eq(users.id, 1)});
    ```
  - Do this:
    ```
    const response = db.query.users.findMany({where: {id: 1}});
    ```

- Prefer drizzle .query ORM syntax over select syntax for most queries.
- Use drizzle query builder syntax for complex queries, using sql`` only as a last resort.

## Zod Validation Schemas

- Infer zod schemas from database schemas using createInsertSchema and createSelectSchema from drizzle-orm/zod.
- For required string inputs, always add `.nonempty()` to prevent empty strings from being submitted.
- For number inputs, use `z.coerce.number<number>()`.

## TypeScript

- Don't unnecessarily add `try`/`catch` blocks.
- Don't cast `any`
- Avoid custom types, infer from existing types and zod schemas.

## React

- Avoid useEffect when possible, prefer derived state and setting values directly in event handlers.
- Avoid useMemo; we are already using React Compiler so memoization is built in by default.

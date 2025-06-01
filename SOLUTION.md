# SOLUTION

## Estimation

Estimated: 8 hours

Spent: 8 hours

# Building a Better "Product"

To deliver a truly high-quality product for this task, I recommend the following approach:

---

## Tech Stack

-   **Next.js 15**
-   **React 19**
-   **TypeScript**
-   **Redux Toolkit + RTK Query**
-   **Tailwind CSS**
-   **Playwright** (for end-to-end testing)
-   **Prettier + ESLint** (code formatting and linting)

---

## 1. Architecture & Project Structure

-   Use a modular structure: separate **UI components**, **custom hooks**, **redux/store**, **utilities**, **constants**, and **types**.
-   Follow a **feature-based folder structure** to ensure scalability and maintainability.

---

## 2. Typing & Code Standards

-   Use **TypeScript** to enforce strict typing across components, hooks, utilities, and store logic.
-   Centralize shared types in a dedicated folder (e.g., `src/tools/types`).

---

## 3. Filtering, Sorting & Pagination

-   Implement **reusable custom hooks** for filter state management:
    -   `useSelectState`
    -   `useMultiSelectState`
    -   `useTextState`
-   Break filters, sorting, and pagination into **modular UI components** with a shared control panel.

---

## 4. UI/UX Best Practices

-   Use **Tailwind CSS** for fast, scalable, and responsive design.
-   Add:
    -   **Skeleton loaders** for loading states
    -   **Error boundaries** and empty states
    -   **Responsive layout** for mobile/tablet support
-   Optimize image rendering using `<Image />` from **Next.js** with `remotePatterns`.
-   Ensure **accessibility (a11y)**:
    -   `aria-*` attributes
    -   Proper `alt` texts
    -   Keyboard focus support

---

## 5. State Management & API Integration

-   Use **Redux Toolkit** for managing product collection and filter state.
-   Organize the Redux logic in a separate `redux/` directory.
-   Use **RTK Query** (or `createAsyncThunk`) for managing async requests with cache, status, and error handling.

---

## 6. Testing

-   Write **e2e tests** using **Playwright** for major scenarios.
-   Extract element selectors and utility helpers into separate files to keep tests maintainable and readable.

---

## 7. Documentation & Tooling

-   Configure **path aliases** via `tsconfig.json` for easier imports.
-   Document the project structure and usage instructions in `README.md`.
-   Set up **Prettier** for code formatting and consistent code standards.

---

## ⏱️ Time Estimation

| Task                        | Estimated Time |
| --------------------------- | -------------- |
| Architecture & Structure    | 1 hour         |
| Typing & Custom Hooks       | 2 hours        |
| UI/UX & Component Design    | 2 hours        |
| Redux & Async Data Handling | 1 hour         |
| Testing & Documentation     | 2 hours        |

> **Total Estimated Time: 8 hours**  
> (For a production-ready solution with tests, documentation, and scalability in mind)

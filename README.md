# Angular Bookstore

A sample bookstore application built with Angular 19. Browse books, search and filter by category, view book details, and manage a shopping cart.

## Features

- **Book Listing** - Browse a catalog of books with cover images, titles, authors, and prices
- **Search and Filter** - Search books by title or author and filter by category
- **Book Details** - View detailed information about each book
- **Shopping Cart** - Add books to your cart, adjust quantities, and view the total

## Prerequisites

- Node.js v22 or later
- npm 11 or later

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npx ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change any source files.

### Run unit tests

```bash
npx ng test
```

To run tests in headless mode (CI):

```bash
CHROME_BIN=/path/to/chrome npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox
```

### Build for production

```bash
npx ng build
```

Build artifacts are stored in the `dist/` directory.

## Project Structure

```
src/
  app/
    app.component.ts       - Root component
    app.config.ts          - Application configuration
    app.routes.ts          - Route definitions
  index.html               - Main HTML page
  main.ts                  - Application entry point
  styles.css               - Global styles
```

## Technology Stack

- **Framework**: Angular 19 with standalone components
- **Language**: TypeScript
- **Routing**: Angular Router
- **State Management**: RxJS-based services
- **Testing**: Karma + Jasmine
- **Styling**: CSS

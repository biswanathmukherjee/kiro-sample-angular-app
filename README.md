# React Bookstore

A sample bookstore application built with React 19 and Vite. Browse books, search and filter by category, view book details, manage a shopping cart, and complete checkout with order confirmation.

## Features

- **Book Listing** - Browse a catalog of books with cover images, titles, authors, and prices
- **Search and Filter** - Search books by title or author and filter by category
- **Book Details** - View detailed information about each book
- **Shopping Cart** - Add books to your cart, adjust quantities, and view the total
- **Checkout** - Complete your purchase with a checkout flow
- **Order Confirmation** - View order confirmation after a successful checkout

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
npm run dev
```

Navigate to `http://localhost:5173/`. The application will automatically reload when you change any source files.

### Run unit tests

```bash
npm test
```

### Build for production

```bash
npm run build
```

Build artifacts are stored in the `dist/` directory.

## Project Structure

```
src/
  components/
    BookList.tsx             - Book catalog with search and filtering
    BookDetail.tsx           - Detailed view for a single book
    Cart.tsx                 - Shopping cart page
    Checkout.tsx             - Checkout flow
    Header.tsx               - App header with navigation
    OrderConfirmation.tsx    - Order confirmation page
  contexts/
    CartContext.tsx           - Shopping cart state management
    OrderContext.tsx          - Order state management
  models/
    book.model.ts            - Book type definition
    cart-item.model.ts       - Cart item type definition
    order.model.ts           - Order type definition
  services/
    bookService.ts           - Book data and retrieval logic
  App.tsx                    - Root component with route definitions
  main.tsx                   - Application entry point
  styles.css                 - Global styles
```

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router v7
- **State Management**: React Context
- **Testing**: Vitest + React Testing Library
- **Styling**: CSS

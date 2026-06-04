# Ecommerce Project

This is a full-stack ecommerce practice project. It has a React/Vite frontend in
`ecommerce-project` and an Express backend in `ecommerce-backend`. The frontend
shows products, manages cart state, lets the user review checkout details, choose
delivery options, place orders, and view previous orders. The backend provides
product, cart, delivery, order, payment summary, image, and reset APIs.

## Project Overview

The project is built like a small online store. Users can browse products on the
home page, choose a quantity, add products to the cart, review the cart on the
checkout page, change quantities, delete items, select delivery options, and
place an order. After an order is placed, the app navigates to the orders page
and shows the order history.

The frontend communicates with the backend through API paths such as
`/api/products` and `/api/cart-items`. During development, Vite proxies these
paths to the backend server running at `http://localhost:3000`.

## Technologies Used

- React 19
- Vite 8
- TypeScript configuration with JavaScript/JSX support
- React Router
- Axios
- Dayjs
- ESLint
- Express
- Sequelize
- SQLite through `sql.js-as-sqlite3`

## Folder Structure

```text
Ecommerce Project/
  ecommerce-project/
    src/
      components/
        Header.tsx
        Header.css
      pages/
        home/
          HomePage.jsx
          ProductsGrid.jsx
          Product.jsx
          HomePage.css
        checkout/
          CheckoutPage.jsx
          OrderSummary.jsx
          DeliveryOptions.jsx
          PaymentSummary.jsx
          CheckoutPage.css
          checkout-header.css
        orders/
          OrdersPage.jsx
          OrdersPage.css
      utils/
        money.js
      App.tsx
      main.tsx
      index.css
    public/
      images/
        products/
        ratings/
        icons/
    package.json
    vite.config.ts

  ecommerce-backend/
    server.js
    routes/
      products.js
      cartItems.js
      deliveryOptions.js
      orders.js
      paymentSummary.js
      reset.js
    models/
    defaultData/
    images/
    database.sqlite
    package.json
```

## Frontend Pages

### Home Page

The home page loads product data from:

```text
GET /api/products
```

Expected browser output:

- A fixed green header with logo, search bar, orders link, and cart link.
- A responsive product grid.
- Product cards with image, name, rating, rating count, price, quantity selector,
  and an "Add to Cart" button.
- When a product is added, an "Added" message appears briefly.
- The cart quantity in the header updates after the cart is reloaded.

Main files:

- `src/pages/home/HomePage.jsx`
- `src/pages/home/ProductsGrid.jsx`
- `src/pages/home/Product.jsx`
- `src/pages/home/HomePage.css`

### Checkout Page

The checkout page loads the cart, delivery options, and payment summary.

Important API calls:

```text
GET /api/cart-items?expand=product
GET /api/delivery-options?expand=estimatedDeliveryTime
GET /api/payment-summary
PUT /api/cart-items/:productId
DELETE /api/cart-items/:productId
POST /api/orders
```

Expected browser output:

- A checkout header with logo, checkout title, return-to-home link, and lock icon.
- A "Review your order" section.
- Cart item cards showing delivery date, product image, product name, price,
  quantity, update/delete controls, and delivery option choices.
- A payment summary showing item cost, shipping, total before tax, tax, and order
  total.
- A "Place your order" button that creates an order and navigates to `/orders`.

Main files:

- `src/pages/checkout/CheckoutPage.jsx`
- `src/pages/checkout/OrderSummary.jsx`
- `src/pages/checkout/DeliveryOptions.jsx`
- `src/pages/checkout/PaymentSummary.jsx`
- `src/pages/checkout/CheckoutPage.css`

### Orders Page

The orders page loads order history from:

```text
GET /api/orders?expand=products
```

Expected browser output:

- The shared header with logo, search bar, orders link, and cart link.
- A "Your Orders" page title.
- Order cards showing order date, total, order id, product images, product names,
  delivery dates, quantities, and action buttons.

Main files:

- `src/pages/orders/OrdersPage.jsx`
- `src/pages/orders/OrdersPage.css`

## Backend API

The backend runs on port `3000` by default and exposes these main routes:

```text
GET    /api/products
GET    /api/products?search=query

GET    /api/cart-items
GET    /api/cart-items?expand=product
POST   /api/cart-items
PUT    /api/cart-items/:productId
DELETE /api/cart-items/:productId

GET    /api/delivery-options
GET    /api/delivery-options?expand=estimatedDeliveryTime

GET    /api/payment-summary

GET    /api/orders
GET    /api/orders?expand=products
GET    /api/orders/:orderId
GET    /api/orders/:orderId?expand=products
POST   /api/orders

POST   /api/reset
```

The backend also serves product and UI images through:

```text
/images
```

## How Data Flows

1. `App.tsx` loads the cart from `/api/cart-items?expand=product`.
2. `HomePage.jsx` loads products from `/api/products`.
3. `Product.jsx` posts selected products to `/api/cart-items`.
4. `CheckoutPage.jsx` loads delivery options and payment summary.
5. `OrderSummary.jsx` updates or deletes cart items.
6. `DeliveryOptions.jsx` updates the selected delivery option for a cart item.
7. `PaymentSummary.jsx` posts to `/api/orders` to create an order.
8. `OrdersPage.jsx` loads all orders from `/api/orders?expand=products`.

## Running The Project

Open two terminals.

Terminal 1, start the backend:

```bash
cd ../ecommerce-backend
npm start
```

Expected backend output:

```text
Server is running on port 3000
```

If the database is empty, the backend also prints:

```text
Default data added to the database.
```

Terminal 2, start the frontend:

```bash
cd ecommerce-project
npm run dev
```

Expected frontend output:

```text
VITE ready
Local: http://localhost:5173/
```

Then open:

```text
http://localhost:5173/
```

## Build And Lint Output From Current Scan

### Lint

Command:

```bash
npm run lint
```

Current output:

```text
> ecommerce-project-type-script@0.0.0 lint
> eslint .

src/App.tsx
  19:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

1 problem (1 error, 0 warnings)
```

### Build

Command:

```bash
npm run build
```

Current output:

```text
> ecommerce-project-type-script@0.0.0 build
> tsc -b && vite build

src/components/Header.tsx(5,18): error TS7031: Binding element 'cart' implicitly has an 'any' type.
src/components/Header.tsx(9,19): error TS7006: Parameter 'cartItem' implicitly has an 'any' type.
```

## Current Notes And Improvements

- `Header.tsx` imports `./header.css`, but the file is named `Header.css`.
  This works on Windows but can fail on case-sensitive systems.
- The checkout header currently shows `3 items` as hard-coded text instead of
  calculating the cart quantity.
- `CheckoutPage.jsx` uses `./api/delivery-options...`; `/api/delivery-options...`
  is cleaner and matches the other API calls.
- The product component is named `Pruduct`, which should be renamed to `Product`.
- The orders page links to `/tracking`, but there is no tracking route yet.
- The "Buy again" button is visible but does not currently add the product to
  the cart.
- ESLint is configured only for `ts` and `tsx` files, so most `jsx` files are not
  linted yet.

## Summary

This ecommerce project already has the core shopping flow in place: product
browsing, cart updates, checkout review, delivery selection, payment summary,
order creation, and order history. The main next step is to fix the TypeScript
and lint issues so the project builds cleanly, then polish the unfinished
features such as dynamic checkout count, buy-again behavior, and package tracking.

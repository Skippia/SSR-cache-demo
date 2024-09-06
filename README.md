# SSR Cache with ETag and Cache-Control

This repository demonstrates how to implement **Server-Side Rendering (SSR)** caching using **Node.js** as the backend and **Nuxt 3** as the frontend.

## Core Ideas

1. **[Works only with SSR]**: Based on `nuxt.config.js`. We can use `swr` routeRules in order to periodically fetch and update cached HTML in the background.
2. **[Works only with SPA (SSR ignores any headers set by server)]**: Based on manual `Cache-Control`, `ETag` and optional `stale-while-revalidate` headers on the backend server.
   - The **Node.js server** generates dynamic content and controls HTTP caching via `ETag` and `Cache-Control` headers.
   - **ETag** ensures that the client can check if the content has changed without refetching it.
   - **Cache-Control** with `max-age` and `stale-while-revalidate` allows the client to serve cached content while asynchronously checking for updates.
   - The **Nuxt 3 client** uses `useAsyncData` to fetch data during SSR and handle HTTP caching to avoid unnecessary server requests and reduce load.
3. **[Works only with SSR]**. Based on global server middleware. We "intercept" source request and using custom storage with TTL (Redis / Memcache / Unstorage) initiate or not HTTP request and cache it.

# Fullstack Challenge 🏅 Space X API

## Frontend teste

### STACK

NextJs with Tailwind and typescript.

#### Install and Start

```bash
npm i && npm run dev
```

#### What have in this project?

[x] Server Components (SSC)

- Using NextJs 13, by default, the components are SSR and it allows us do fetchs data before the component send to client. In SSC, it's impossible use hooks, like useState, useEffect or anyone. Furthermore, the browser properties, as navigate, document, window etc, are unavailable. On the other hand, the nodejs server properties are available, and the component can be async to await the promise resolve.

[x] Client Components

- Using NextJs 13, put 'use client' at top of file component, the components are sent to client, behaving like a tipical React Component.

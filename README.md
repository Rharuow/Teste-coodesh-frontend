# Fullstack Challenge 🏅 Space X API

## Frontend teste

### STACK

NextJs with Tailwind and typescript.

### Descrição

This project are powered by API REST developed to <a href="https://github.com/Rharuow/Teste-coodesh-backend" target="_blank">Backend Fullstack Test</a>. The data are feed by <a href="https://github.com/r-spacex/SpaceX-API">SpaceX public API</a>.

#### Install and Start

```bash
git clone git@github.com:Rharuow/Teste-coodesh-frontend.git && cd ./Teste-coodesh-frontend && npm i && npm run dev
```

#### What have in this project?

- [x] Server Components (SSC)

- Using NextJs 13, by default, the components are SSR and it allows us do fetchs data before the component send to client. In SSC, it's impossible use hooks, like useState, useEffect or anyone. Furthermore, the browser properties, as navigate, document, window etc, are unavailable. On the other hand, the nodejs server properties are available, and the component can be async to await the promise resolve.

- [x] Client Components

- Using NextJs 13, put 'use client' at top of file component, the components are sent to client, behaving like a tipical React Component.

- [x] Pure Component

- Components isolated and utils directories keep functions with a single responsibility.

- [x] Isolated Modules

- Components Modules and Functions Modules exported are available to be used, but can't be possible make modification.

- [x] Responsivity

- In the sm, md and lg breakpoints, the application assume different layouts to respect different screen sizes. To be better the User Interface.

- [x] Reactive filter

- Without button to submit form, the fields are watched and change de data values while they are changed. To be better the User Experience.

#### Tanstack React Query

<p>To prevent many request on filter fields, the React Query are used to stale while revalidate (SWR). If the same search are called, the cache response are returned, until, in the component life cicly, need the revalidation.</p>

#### Plus

- This project have light and dark themes. Provides by context insert on layout file.

- If running localhost, there's a button absolute, bottom and left, that's show how many request are saved by Tanstack React Query.

#### Some prints

1. Charts on desktop screen (Dark theme)

![charts-desktop-screen](https://github.com/Rharuow/Teste-coodesh-frontend/assets/19626398/1c07e8ad-78dc-4c43-a5ac-27ca8b32c997)

2. Launches list table on desktop screen (Dark theme)

![launches-list-desktop-screen](https://github.com/Rharuow/Teste-coodesh-frontend/assets/19626398/349dd2f0-956e-4d11-b84c-61f70052a9d1)

3. Charts on desktop screen (Light theme)

![charts-desktop-screen(light)](https://github.com/Rharuow/Teste-coodesh-frontend/assets/19626398/d931604d-811f-46dd-b2c1-90e64e0eeca2)

4. Launches list table on desktop screen (Light theme)

![launches-list-desktop-screen(light)](https://github.com/Rharuow/Teste-coodesh-frontend/assets/19626398/d483132b-7609-4817-b540-ad3f1881ace3)

5. Pie Chart on mobile screen (Dark theme)

![pie-chart-mobile-dark](https://github.com/Rharuow/Teste-coodesh-frontend/assets/19626398/b6aea5c5-463f-4526-ac8f-4f4966c02b08)

6. Bar Chart on mobile screen (Dark theme)

![bar-chart-mobile-dark](https://github.com/Rharuow/Teste-coodesh-frontend/assets/19626398/67600d25-6ddf-44a6-a021-794aaceb3f37)

7. Tanstack React Query develop tools

![tanstack-develop-tools](https://github.com/Rharuow/Teste-coodesh-frontend/assets/19626398/d8fc340a-b371-45c4-849d-3c086b4916ec)

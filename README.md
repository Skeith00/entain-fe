# Next To Go Races Application

This is a single-page application that displays the "Next to go" races using the Entain API. It allows users to see upcoming races, sorted by time, and provides information such as meeting name, race number, and a countdown timer indicating the start of each race. Users can also toggle race categories to view races belonging to a specific category.

<ins>Project Structure</ins>

The project follows the following component structure:

*Header.vue: This component displays the title header at the top of the page.  
*NextToGoRacesFilter.vue: This is the main parent component that serves as the entry point of the application. It contains the filter *and races components.  
*Filter.vue: This component provides the category selection functionality, allowing users to toggle between different race categories.  
*Races.vue: This component displays the table of races, including the meeting name, race number, and countdown timer for each race.  

<ins>State Management</ins>

store.js handles the state management, particularly for managing the selected race category.

<ins>Unit Tests</ins>

Unit tests have been written using the @vue/test-utils and vitest libraries to ensure the correctness of the components' behavior and rendering.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

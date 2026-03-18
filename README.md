# PlaqueGo — Patient Dashboard

A production-ready admin dashboard for managing dental patient records, built with React, TypeScript, MUI, and Firebase.

🔗 **Live Demo:** [https://plaquego.web.app](https://plaquego.web.app)

![Dashboard Preview](src/assets/The%20Dashboard.png)

## Features

- **Patients Table** — paginated data grid with avatar initials and summary stat cards
- **Dental History** — fillings, extractions, root canals, removable dentures per patient
- **Medical History** — thyroid, diabetes, hypertension conditions per patient
- **Red Flag Habits** — smoking, vaping, chew tobacco, alcohol tracking
- **Progress Data** — weekly oral hygiene scores with grade, brushing, flossing, and mouthwash logs

All modals open with a slide-up animation, blurred backdrop, and a gradient accent strip colour-coded by category.

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript |
| Component Library | MUI v7 (Material UI) |
| Data Grid | MUI X Data Grid v8 |
| Backend / Database | Firebase Firestore |
| Hosting | Firebase Hosting |
| Build Tool | Vite 8 |

## Firestore Data Structure

```
users/{uid}/profile/userInfo
users/{uid}/profile/dentalHistory
users/{uid}/profile/medicalHistory
users/{uid}/profile/redFlagHabits
users/{uid}/progressData/{year_month_week_day}
```

## Getting Started

```bash
# Install dependencies
npm install

# Add your Firebase credentials
cp .env.example .env
# Fill in VITE_FIREBASE_* values

# Run dev server
npm run dev

# Production build
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## Environment Variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

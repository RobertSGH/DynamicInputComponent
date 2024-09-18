Dynamic Input Component

#Overview
This project implements a dynamic input component in React that allows users to input both regular text and tags. The component provides a seamless experience for mixing text and selectable tags within a single input field.
Features

#Dual Input Types:
String: Regular text input
Tags: Selectable from a predefined list

#Tag Management:
Click to insert tags at the cursor position
Visual distinction of tags within the input (e.g., pill or badge style)
Delete tags using an (x) button or backspace key

#Responsive Design:
Styled with Tailwind CSS.

Installation

Clone the repository:
git clone [your-repo-url]
cd dynamicinputcomponent

Install dependencies:
npm install / yarn install

#Usage
To start the development server:
npm run dev / yarn dev

This will start the Vite development server. Open your browser and navigate to http://localhost:5173 (or the port specified in the console) to view the application.

#Dependencies
React: ^18.3.1
React DOM: ^18.3.1
TypeScript: ^5.5.3
Vite: ^5.4.1
Tailwind CSS: ^3.4.12

For a full list of dependencies and dev dependencies, refer to the package.json file.

#Development
This project uses:
TypeScript for type-safe code
ESLint for code linting
Vite as the build tool and development server

To lint your code:
npm run lint / yarn lint

To build for production:
npm run build / yarn build

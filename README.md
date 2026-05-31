# Motivation App

A React application that displays motivational quotes, images, and AI-generated content to inspire and motivate users. The app allows users to get random motivational content from various sources including:

- Pre-written quotes from a local dataset
- Random motivational images
- AI-generated quotes from movies, TV shows, books, and more (requires Gemini API key)

## Features

- **View Random Motivational Content**: Get a random quote, image, or AI-generated motivational content with each button click
- **Add New Quotes**: Users can add their own quotes to the collection
- **Remove Quotes**: Remove quotes that no longer inspire you
- **Mark Quotes as Favorites**: Save your favorite quotes for easy access
- **AI-Powered Quotes**: Generate motivational quotes from movies, TV shows, books, and more using Google's Gemini AI (requires API key)
- **Image Motivation**: Display beautiful motivational images from a curated collection
- **Local Storage**: Your API key and favorite quotes are saved locally in your browser
- **API Key Management**: Enter, view, and clear your Gemini API key securely

## Requirements

- Node.js 14+ or newer
- npm or yarn
- Google Gemini API key (optional, for AI-generated quotes)

## Setup

1. Install dependencies:
   - npm: `npm install`
   - yarn: `yarn`

2. Start development server:
   - npm: `npm start`
   - yarn: `yarn start`

3. For AI-generated quotes, obtain a Google Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an API key
   - Enter it in the app's API key field

## Usage

1. Click the "Motivate Me" button to get a random motivational quote, image, or AI-generated content
2. Enter your Gemini API key in the input field to enable AI-generated quotes
3. Use the "Clear API Key" button to remove your stored key
4. Use the "View API Key" button to check your current key status

## Build

- npm: `npm run build`

## Testing

- npm: `npm test` (if tests are configured)

## License

MIT

## Notes

- The app uses Vite for fast development and building
- Tailwind CSS is used for styling
- API keys are stored only in localStorage and never transmitted to any server
- Keep the project directory structure standard for Vite + React + TypeScript setup

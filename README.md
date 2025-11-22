# A11y Vision Frontend

Accessibility scanning frontend application built with React, TypeScript, and Vite.

## Backend API

Connected to: https://api.a11yvision.labnexus.my.id

## Deployment to Vercel

### Steps

1. **Deploy to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will auto-detect the configuration from vercel.json

2. **Set Environment Variables in Vercel**
   - Go to your project settings in Vercel
   - Navigate to Environment Variables
   - Add: VITE_API_URL = https://api.a11yvision.labnexus.my.id
   - Redeploy

## Local Development

`ash
npm install
npm run dev
`

The app will run on http://localhost:5173

## Build

`ash
npm run build
`

The build output will be in dist/

# A11y Vision Frontend

Accessibility scanning frontend application built with React, TypeScript, and Vite.

## Deployment to Vercel

### Prerequisites

- A Vercel account
- Your backend API deployed and accessible

### Steps

1. **Configure Environment Variables**

   - Copy `.env.example` to `.env.local`
   - Set `VITE_API_BASE_URL` to your backend API URL

2. **Deploy to Vercel**

   **Option A: Using Vercel CLI**

   ```bash
   npm install -g vercel
   vercel
   ```

   **Option B: Using Vercel Dashboard**

   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will auto-detect the configuration from `vercel.json`

3. **Set Environment Variables in Vercel**
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add `VITE_API_BASE_URL` with your backend API URL
   - Redeploy if needed

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build output will be in `dist/`

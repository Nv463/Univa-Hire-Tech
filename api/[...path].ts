import app from '../server';

// Vercel routes /api/* requests through this catch-all function.
// The Express app keeps its existing /api/auth, /api/jobs, and other routes.
export default app;

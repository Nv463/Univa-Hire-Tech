import app from '../server';

// Vercel Node.js functions can invoke an Express application directly.
// Disable the platform body parser so Express/multer can read JSON and PDF streams.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;

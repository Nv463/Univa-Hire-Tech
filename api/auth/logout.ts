import app from '../../server.mjs';

// Preserve the request body so Express can parse JSON for auth endpoints.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;

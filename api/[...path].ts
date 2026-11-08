import app from '../server.mjs';

// Let Express/multer consume JSON and multipart PDF request streams.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;

import app from '../server';

// Let Express parse JSON and multipart uploads itself. Vercel's default
// body parser consumes the request stream before multer can read PDF uploads.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: any, res: any) {
  return app(req, res);
}

import app from './server';
import { createServer as createViteServer } from 'vite';

const PORT = Number(process.env.PORT || 3000);

async function start() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
  app.listen(PORT, () => console.log('UNIVA HIRE TECH server listening on port ' + PORT));
}

start();

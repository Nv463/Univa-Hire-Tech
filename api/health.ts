import app from '../server';

// Deliberately use the same backend module as the catch-all API function.
// A standalone health handler could pass while the actual API module crashes.
export default app;

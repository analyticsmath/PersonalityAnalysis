const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function startMongo() {
  console.log('[INFO] Starting local MongoDB server on port 27017...');
  mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbName: 'personality-assessor',
    },
  });
  console.log('[PASS] Local MongoDB server operational at:', mongoServer.getUri());
}

startMongo().catch((err) => {
  console.error('[FAIL] Error starting local MongoDB server:', err);
  process.exit(1);
});

const { MongoClient } = require('mongodb');

async function checkDatabases() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    // List all databases
    const admin = client.db().admin();
    const databases = await admin.listDatabases();
    
    console.log('\n=== Available Databases ===');
    databases.databases.forEach(db => {
      console.log(`- ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    // Check point database
    const pointDb = client.db('point');
    const collections = await pointDb.listCollections().toArray();
    
    console.log('\n=== Point Database Collections ===');
    if (collections.length === 0) {
      console.log('No collections found in point database');
    } else {
      collections.forEach(col => {
        console.log(`- ${col.name}`);
      });
    }
    
    // Check point_system database
    const pointSystemDb = client.db('point_system');
    const oldCollections = await pointSystemDb.listCollections().toArray();
    
    console.log('\n=== Point_System Database Collections ===');
    if (oldCollections.length === 0) {
      console.log('No collections found in point_system database');
    } else {
      oldCollections.forEach(col => {
        console.log(`- ${col.name}`);
      });
    }
    
    // Count users in both databases
    if (collections.some(c => c.name === 'users')) {
      const userCount = await pointDb.collection('users').countDocuments();
      console.log(`\nUsers in point database: ${userCount}`);
    }
    
    if (oldCollections.some(c => c.name === 'users')) {
      const oldUserCount = await pointSystemDb.collection('users').countDocuments();
      console.log(`Users in point_system database: ${oldUserCount}`);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

checkDatabases();

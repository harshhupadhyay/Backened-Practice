import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/indexing_practice';
const DB_NAME = 'indexing_practice';
const COLLECTION_NAME = 'users';

const ADDITIONAL_USERS = 9_000_000;
const BATCH_SIZE = 25_000;

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane'
];

const FIRST_NAMES = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan',
  'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Advaith',
  'Diya', 'Saanvi', 'Ananya', 'Aadhya', 'Pari', 'Khushi', 'Anika', 'Navya',
  'Riya', 'Sneha', 'Tanvi', 'Isha', 'Kavya', 'Pooja', 'Neha'
];

const LAST_NAMES = [
  'Sharma', 'Verma', 'Patel', 'Singh', 'Gupta', 'Mehta', 'Kumar', 'Joshi',
  'Shah', 'Bhatia', 'Reddy', 'Nair', 'Chopra', 'Malhotra', 'Saxena', 'Kapoor'
];

async function add9MillionUsers() {
  console.log(`Connecting to MongoDB (${MONGO_URI})...`);
  const conn = await mongoose.connect(MONGO_URI);
  const db = conn.connection.db;
  const collection = db.collection(COLLECTION_NAME);

  const existingCount = await collection.countDocuments();
  console.log(`Existing documents in ${DB_NAME}.${COLLECTION_NAME}: ${existingCount.toLocaleString()}`);

  const startId = existingCount + 1;
  const targetTotal = existingCount + ADDITIONAL_USERS;

  console.log(`Adding ${ADDITIONAL_USERS.toLocaleString()} more users (IDs ${startId.toLocaleString()} to ${targetTotal.toLocaleString()})...`);
  console.log(`Batch size: ${BATCH_SIZE.toLocaleString()}`);

  const startTime = Date.now();
  let added = 0;
  const totalBatches = ADDITIONAL_USERS / BATCH_SIZE;

  for (let batch = 1; batch <= totalBatches; batch++) {
    const usersBatch = new Array(BATCH_SIZE);

    for (let i = 0; i < BATCH_SIZE; i++) {
      const id = startId + added + i;
      const firstName = FIRST_NAMES[id % FIRST_NAMES.length];
      const lastName = LAST_NAMES[id % LAST_NAMES.length];
      const city = CITIES[id % CITIES.length];

      usersBatch[i] = {
        name: `${firstName} ${lastName}`,
        username: `user_${id}`,
        email: `user_${id}@example.com`,
        age: 18 + (id % 63),
        city: city,
        followersCount: Math.floor((id * 37) % 50000),
        isVerified: (id % 7 === 0),
        score: Math.round(((id * 17) % 1000) * 10) / 10,
        createdAt: new Date(Date.now() - ((id * 3600000) % (3 * 365 * 24 * 3600000)))
      };
    }

    await collection.insertMany(usersBatch, { ordered: false });
    added += BATCH_SIZE;

    if (batch % 4 === 0 || batch === totalBatches) {
      const percent = ((added / ADDITIONAL_USERS) * 100).toFixed(1);
      const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
      const docsPerSec = Math.round(added / (elapsedSec || 1)).toLocaleString();
      process.stdout.write(`\r[${percent}%] Added ${added.toLocaleString()} / ${ADDITIONAL_USERS.toLocaleString()} (${elapsedSec}s, ~${docsPerSec} docs/s)`);
    }
  }

  const totalTimeSeconds = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n\n Done! Added 9,000,000 users in ${totalTimeSeconds} seconds.`);

  const finalCount = await collection.countDocuments();
  console.log(`Total documents now in ${DB_NAME}.${COLLECTION_NAME}: ${finalCount.toLocaleString()}`);

  await mongoose.disconnect();
}

add9MillionUsers().catch((err) => {
  console.error('Error adding 9M users:', err);
  process.exit(1);
});


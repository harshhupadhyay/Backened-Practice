import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/indexing_practice';
const DB_NAME = 'indexing_practice';
const COLLECTION_NAME = 'users';

const TOTAL_USERS = 1_000_000;
const BATCH_SIZE = 20_000;

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

async function generate1MillionUsers() {
  console.log(`Connecting to MongoDB (${MONGO_URI})...`);
  const conn = await mongoose.connect(MONGO_URI);
  const db = conn.connection.db;
  const collection = db.collection(COLLECTION_NAME);

  console.log(`Resetting '${COLLECTION_NAME}' collection in '${DB_NAME}'...`);
  await collection.drop().catch(() => {});

  console.log(`Generating and inserting ${TOTAL_USERS.toLocaleString()} users in batches of ${BATCH_SIZE.toLocaleString()}...`);
  const startTime = Date.now();

  let inserted = 0;
  const totalBatches = TOTAL_USERS / BATCH_SIZE;

  for (let batch = 1; batch <= totalBatches; batch++) {
    const usersBatch = new Array(BATCH_SIZE);

    for (let i = 0; i < BATCH_SIZE; i++) {
      const id = inserted + i + 1;
      const firstName = FIRST_NAMES[id % FIRST_NAMES.length];
      const lastName = LAST_NAMES[id % LAST_NAMES.length];
      const city = CITIES[id % CITIES.length];

      usersBatch[i] = {
        name: `${firstName} ${lastName}`,
        username: `user_${id}`,
        email: `user_${id}@example.com`,
        age: 18 + (id % 63), // Ages 18 to 80
        city: city,
        followersCount: Math.floor((id * 37) % 50000), // 0 to 50,000
        isVerified: (id % 7 === 0), // ~14% verified
        score: Math.round(((id * 17) % 1000) * 10) / 10,
        createdAt: new Date(Date.now() - ((id * 3600000) % (3 * 365 * 24 * 3600000)))
      };
    }

    await collection.insertMany(usersBatch, { ordered: false });
    inserted += BATCH_SIZE;

    const percent = Math.round((inserted / TOTAL_USERS) * 100);
    const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
    process.stdout.write(`\r[${percent}%] Inserted ${inserted.toLocaleString()} / ${TOTAL_USERS.toLocaleString()} users (${elapsedSeconds}s)`);
  }

  const totalTimeSeconds = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n\n Done! Inserted ${TOTAL_USERS.toLocaleString()} documents in ${totalTimeSeconds} seconds.`);

  const count = await collection.countDocuments();
  console.log(`Total documents confirmed in ${DB_NAME}.${COLLECTION_NAME}: ${count.toLocaleString()}`);

  await mongoose.disconnect();
}

generate1MillionUsers().catch((err) => {
  console.error('Generation failed:', err);
  process.exit(1);
});


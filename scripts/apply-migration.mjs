import fs from 'fs';
import path from 'path';
import pg from 'pg';

const { Client } = pg;

// Allow self-signed / Supabase pooler certificates for the migration runner
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const targetArg =
  process.argv[2] || 'supabase/migrations/20261125_auto_chat_settings.sql';
const migrationPath = path.isAbsolute(targetArg)
  ? targetArg
  : path.resolve(process.cwd(), targetArg);

if (!fs.existsSync(migrationPath)) {
  console.error(`Migration file not found: ${migrationPath}`);
  process.exit(1);
}

// Read .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local file not found');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
  }
});

const connectionString =
  env.POSTGRES_URL_NON_POOLING || env.POSTGRES_URL || env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  console.error('No Postgres connection string found in .env.local');
  process.exit(1);
}

// Strip query parameters to avoid pg-connection-string overriding SSL options
const cleanUrl = connectionString.split('?')[0];

console.log('Connecting to Supabase PostgreSQL...');
const client = new Client({
  connectionString: cleanUrl,
  ssl: { rejectUnauthorized: false },
});

async function runMigration() {
  try {
    await client.connect();
    console.log('Connected successfully to Supabase database!');

    const sql = fs.readFileSync(migrationPath, 'utf-8');
    console.log(`Executing migration ${path.basename(migrationPath)}...`);
    await client.query(sql);
    console.log('Migration executed successfully!');

    const verify = await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'auto_chat_settings'`
    );
    console.log('Verified table:', verify.rows);
  } catch (err) {
    console.error('Error applying migration:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();

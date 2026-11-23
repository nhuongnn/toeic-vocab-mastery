import fs from 'fs';
import path from 'path';
import pg from 'pg';

const { Client } = pg;

// Allow self-signed / Supabase pooler certificates for the migration runner
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Read .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
  }
});

let connectionString = env.POSTGRES_URL_NON_POOLING || env.POSTGRES_URL || env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  console.error('No Postgres connection string found in .env.local');
  process.exit(1);
}

// Strip query parameters to avoid pg-connection-string overriding SSL options
const cleanUrl = connectionString.split('?')[0];

console.log('Connecting to Supabase PostgreSQL...');
const client = new Client({
  connectionString: cleanUrl,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  try {
    await client.connect();
    console.log('Connected successfully to Supabase database!');

    const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/20261123_system_ai_settings.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    console.log('Executing migration 20261123_system_ai_settings.sql...');
    await client.query(sql);
    console.log('Migration executed successfully!');

    // Verify row
    const res = await client.query('SELECT * FROM system_ai_settings WHERE id = $1', ['global_config']);
    console.log('Verified system_ai_settings row:', res.rows[0]);
  } catch (err) {
    console.error('Error applying migration:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();

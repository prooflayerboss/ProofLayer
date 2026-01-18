import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function runMigration() {
  console.log('Running migration...');

  const sql = fs.readFileSync('migration.sql', 'utf8');

  // Split by semicolons and execute each statement
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (const statement of statements) {
    if (statement.includes('SELECT')) {
      const result = await prisma.$queryRawUnsafe(statement);
      console.log(result);
    } else {
      await prisma.$executeRawUnsafe(statement);
      console.log('✓ Executed statement');
    }
  }

  console.log('\n✅ Migration completed successfully!');
}

runMigration()
  .catch((e) => {
    console.error('❌ Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

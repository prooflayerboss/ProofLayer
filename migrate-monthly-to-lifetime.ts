import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Migrating MONTHLY users to LIFETIME...');

  const result = await prisma.entitlement.updateMany({
    where: {
      plan: 'MONTHLY' as any, // TypeScript doesn't know about MONTHLY anymore
    },
    data: {
      plan: 'LIFETIME' as any,
      // Keep their subscription data intact for record keeping
    },
  });

  console.log(`✓ Migrated ${result.count} users from MONTHLY to LIFETIME`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

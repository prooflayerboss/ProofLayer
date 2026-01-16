import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get your user email
  const email = process.argv[2];

  if (!email) {
    console.error('Usage: npx ts-node manual-upgrade.ts <your-email>');
    process.exit(1);
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { entitlement: true },
  });

  if (!user) {
    console.error(`User with email ${email} not found`);
    process.exit(1);
  }

  if (user.entitlement) {
    await prisma.entitlement.update({
      where: { userId: user.id },
      data: { plan: 'LIFETIME' },
    });
    console.log(`✓ Upgraded ${email} to LIFETIME plan`);
  } else {
    console.error('User has no entitlement record');
  }
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

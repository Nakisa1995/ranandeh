import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'ali@example.com' },
    update: {},
    create: {
      email: 'ali@example.com',
      name: 'Ali Rahimi',
      role: 'INSTRUCTOR',
      instructorProfile: {
        create: {
          city: 'London',
          postcode: 'SW1A',
          phone: '07123456789',
          bio: 'DVSA ADI, 8 years experience',
          hourlyRate: 35,
          rating: 4.8,
          verified: true
        }
      }
    }
  });

  await prisma.user.upsert({
    where: { email: 'sara@example.com' },
    update: {},
    create: {
      email: 'sara@example.com',
      name: 'Sara Moradi',
      role: 'INSTRUCTOR',
      instructorProfile: {
        create: {
          city: 'Manchester',
          postcode: 'M1',
          phone: '07987654321',
          bio: 'Manual & Automatic',
          hourlyRate: 32,
          rating: 4.6
        }
      }
    }
  });

  console.log('Seed done ✅');
}

main().finally(() => prisma.$disconnect());

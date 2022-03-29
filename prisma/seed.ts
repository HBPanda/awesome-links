import { PrismaClient } from '@prisma/client';
import { links } from '../data/links';

const prisma = new PrismaClient();

async function main() {
  
  await prisma.user.create({
    data: {
      email: 'user@gmail.com',
      role: {
        connectOrCreate: {
          where: {name: 'User'},
          create: {name: 'User'}
        }
      }
    },
  });
  
  await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      role: {
        connectOrCreate: {
          where: {name: 'Admin'},
          create: {name: 'Admin'}
        }
      }
    },
  });

  await prisma.link.createMany({
    data: links,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);

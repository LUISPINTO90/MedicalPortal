import bcrypt from "bcryptjs";
import prisma from "./utils/prisma";

async function main() {
  // Crear usuario administrador de prueba
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const user = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      password: hashedPassword,
    },
  });

  console.log("Usuario creado:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

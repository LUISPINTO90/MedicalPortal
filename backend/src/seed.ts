import bcrypt from "bcryptjs";
import prisma from "./utils/prisma";

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // 1. Crear usuario administrador de prueba
  const hashedPassword = await bcrypt.hash("adminadmin", 10);

  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Usuario administrador creado:", user.email);

  // 2. Crear pacientes de prueba (solo si no existen)
  const patientsData = [
    {
      nombre: "María José",
      apellidos: "García López",
      edad: 28,
      curp: "GALM950815MDFRRR01",
      telefono: "5551234567",
      direccion: "Calle Reforma 123, Col. Centro, CDMX",
      email: "maria.garcia@email.com",
      tipoSangre: "O+",
      sexo: "F",
      observaciones:
        "Alérgica a la penicilina. Antecedentes de hipertensión familiar.",
      userId: user.id,
    },
    {
      nombre: "Carlos Eduardo",
      apellidos: "Martínez Silva",
      edad: 45,
      curp: "MASC780320HDFRRL08",
      telefono: "5559876543",
      direccion: "Av. Insurgentes Sur 456, Col. Roma Norte, CDMX",
      email: "carlos.martinez@email.com",
      tipoSangre: "A+",
      sexo: "M",
      observaciones:
        "Diabético tipo 2. Toma metformina 850mg dos veces al día.",
      userId: user.id,
    },
    {
      nombre: "Ana Patricia",
      apellidos: "Rodríguez Hernández",
      edad: 34,
      curp: "ROHA890512MDFRDN03",
      telefono: "5556789012",
      direccion: "Calle 5 de Mayo 789, Col. Doctores, CDMX",
      email: "ana.rodriguez@email.com",
      tipoSangre: "B-",
      sexo: "F",
      observaciones: "Embarazada (20 semanas). Control prenatal regular.",
      userId: user.id,
    },
    {
      nombre: "Roberto",
      apellidos: "Jiménez Morales",
      edad: 67,
      curp: "JIMR570218HDFRMT05",
      telefono: "5554567890",
      direccion: "Privada San Juan 321, Col. Coyoacán, CDMX",
      email: "roberto.jimenez@email.com",
      tipoSangre: "AB+",
      sexo: "M",
      observaciones:
        "Hipertensión arterial controlada. Marcapasos implantado en 2020.",
      userId: user.id,
    },
    {
      nombre: "Sofía",
      apellidos: "González Vásquez",
      edad: 22,
      curp: "GOVS010903MDFNZF07",
      telefono: "5552345678",
      direccion: "Calle Universidad 654, Col. Del Valle, CDMX",
      email: "sofia.gonzalez@email.com",
      tipoSangre: "O-",
      sexo: "F",
      observaciones:
        "Estudiante universitaria. Sin antecedentes médicos relevantes.",
      userId: user.id,
    },
    {
      nombre: "Pedro Luis",
      apellidos: "Sánchez Torres",
      edad: 52,
      curp: "SATP710825HDFRDR02",
      telefono: "5558901234",
      direccion: "Av. Revolución 987, Col. San Ángel, CDMX",
      tipoSangre: "A-",
      sexo: "M",
      observaciones:
        "Antecedentes de infarto hace 3 años. Toma anticoagulantes.",
      userId: user.id,
    },
  ];

  const patients = [];
  for (const patientData of patientsData) {
    try {
      const existingPatient = await prisma.patient.findUnique({
        where: { curp: patientData.curp },
      });

      if (!existingPatient) {
        const patient = await prisma.patient.create({
          data: patientData,
        });
        patients.push(patient);
        console.log(
          `✅ Paciente creado: ${patient.nombre} ${patient.apellidos}`
        );
      } else {
        patients.push(existingPatient);
        console.log(
          `ℹ️ Paciente ya existe: ${existingPatient.nombre} ${existingPatient.apellidos}`
        );
      }
    } catch (error) {
      console.log(`⚠️ Error creando paciente ${patientData.nombre}: ${error}`);
    }
  }

  // 3. Verificar si las tablas de citas y tratamientos existen
  try {
    const appointmentCount = await prisma.appointment.count();
    console.log(`ℹ️ Citas existentes en la base de datos: ${appointmentCount}`);
  } catch (error) {
    console.log(
      "⚠️ La tabla 'appointments' no existe aún. Ejecuta 'npx prisma db push' primero."
    );
    return;
  }

  try {
    const treatmentCount = await prisma.treatment.count();
    console.log(
      `ℹ️ Tratamientos existentes en la base de datos: ${treatmentCount}`
    );
  } catch (error) {
    console.log(
      "⚠️ La tabla 'treatments' no existe aún. Ejecuta 'npx prisma db push' primero."
    );
    return;
  }

  // 4. Crear citas de prueba
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const appointmentsData = [
    {
      fecha: today,
      hora: "09:30",
      motivo: "Consulta general",
      notas:
        "Paciente refiere dolor de cabeza recurrente desde hace una semana.",
      estatus: "PENDIENTE" as const,
      patientId: patients[0].id,
      userId: user.id,
    },
    {
      fecha: today,
      hora: "11:00",
      motivo: "Control de diabetes",
      notas: "Revisión de niveles de glucosa y ajuste de medicación.",
      estatus: "PENDIENTE" as const,
      patientId: patients[1].id,
      userId: user.id,
    },
    {
      fecha: tomorrow,
      hora: "10:15",
      motivo: "Control prenatal",
      notas: "Ultrasonido de rutina semana 20.",
      estatus: "PENDIENTE" as const,
      patientId: patients[2].id,
      userId: user.id,
    },
    {
      fecha: nextWeek,
      hora: "14:30",
      motivo: "Seguimiento cardiológico",
      notas: "Revisión de marcapasos y electrocardiograma.",
      estatus: "PENDIENTE" as const,
      patientId: patients[3].id,
      userId: user.id,
    },
    {
      fecha: lastWeek,
      hora: "16:00",
      motivo: "Consulta por lesión deportiva",
      notas: "Esguince de tobillo derecho durante práctica de fútbol.",
      estatus: "REALIZADA" as const,
      patientId: patients[4].id,
      userId: user.id,
    },
    {
      fecha: lastWeek,
      hora: "13:45",
      motivo: "Consulta cardiológica urgente",
      notas: "Paciente canceló por mejora en síntomas.",
      estatus: "CANCELADA" as const,
      patientId: patients[5].id,
      userId: user.id,
    },
  ];

  for (const appointmentData of appointmentsData) {
    try {
      const appointment = await prisma.appointment.create({
        data: appointmentData,
      });
      console.log(
        `✅ Cita creada: ${appointment.motivo} - ${appointment.estatus}`
      );
    } catch (error) {
      console.log(`⚠️ Error creando cita: ${error}`);
    }
  }

  // 5. Crear tratamientos de prueba
  const treatmentsData = [
    {
      nombre: "Fisioterapia para esguince",
      descripcion:
        "Sesiones de fisioterapia para rehabilitación de esguince de tobillo derecho. Incluye ejercicios de fortalecimiento y movilidad.",
      fechaInicio: new Date(lastWeek.getTime() + 24 * 60 * 60 * 1000), // Un día después de la cita
      duracion: "4 semanas",
      observaciones:
        "3 sesiones por semana. Aplicar hielo después de cada sesión.",
      activo: true,
      patientId: patients[4].id,
      userId: user.id,
    },
    {
      nombre: "Control glucémico intensivo",
      descripcion:
        "Programa de control estricto de diabetes tipo 2 con monitoreo diario de glucosa y ajuste de medicación.",
      fechaInicio: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000), // Hace 30 días
      duracion: "3 meses",
      observaciones:
        "Medición de glucosa 4 veces al día. Dieta estricta baja en carbohidratos.",
      activo: true,
      patientId: patients[1].id,
      userId: user.id,
    },
    {
      nombre: "Seguimiento prenatal",
      descripcion:
        "Control médico especializado durante el embarazo con monitoreo fetal y materno regular.",
      fechaInicio: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000), // Hace 60 días
      duracion: "20 semanas restantes",
      observaciones:
        "Ultrasonidos mensuales. Suplementos de ácido fólico y hierro.",
      activo: true,
      patientId: patients[2].id,
      userId: user.id,
    },
    {
      nombre: "Terapia antihipertensiva",
      descripcion:
        "Tratamiento farmacológico para control de hipertensión arterial con IECA y diuréticos.",
      fechaInicio: new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000), // Hace 90 días
      duracion: "6 meses",
      observaciones:
        "Monitoreo semanal de presión arterial. Dieta baja en sodio.",
      activo: true,
      patientId: patients[3].id,
      userId: user.id,
    },
    {
      nombre: "Profilaxis antibiótica",
      descripcion:
        "Tratamiento preventivo con antibióticos por procedimiento dental reciente.",
      fechaInicio: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000), // Hace 14 días
      duracion: "7 días",
      observaciones: "Tratamiento completado sin complicaciones.",
      activo: false,
      patientId: patients[0].id,
      userId: user.id,
    },
    {
      nombre: "Rehabilitación cardiaca",
      descripcion:
        "Programa de rehabilitación post-infarto con ejercicio supervisado y educación nutricional.",
      fechaInicio: new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000), // Hace 180 días
      duracion: "12 semanas",
      observaciones:
        "Programa completado exitosamente. Paciente mejoró capacidad cardiovascular.",
      activo: false,
      patientId: patients[5].id,
      userId: user.id,
    },
  ];

  for (const treatmentData of treatmentsData) {
    try {
      const treatment = await prisma.treatment.create({
        data: treatmentData,
      });
      console.log(
        `✅ Tratamiento creado: ${treatment.nombre} - ${
          treatment.activo ? "Activo" : "Inactivo"
        }`
      );
    } catch (error) {
      console.log(`⚠️ Error creando tratamiento: ${error}`);
    }
  }

  // 6. Estadísticas finales
  const totalPatients = await prisma.patient.count();
  const totalAppointments = await prisma.appointment.count();
  const totalTreatments = await prisma.treatment.count();
  const pendingAppointments = await prisma.appointment.count({
    where: { estatus: "PENDIENTE" },
  });
  const activeTreatments = await prisma.treatment.count({
    where: { activo: true },
  });

  console.log("\n📊 ESTADÍSTICAS FINALES:");
  console.log(`👥 Pacientes en total: ${totalPatients}`);
  console.log(`📅 Citas en total: ${totalAppointments}`);
  console.log(`💊 Tratamientos en total: ${totalTreatments}`);
  console.log(`⏳ Citas pendientes: ${pendingAppointments}`);
  console.log(`🟢 Tratamientos activos: ${activeTreatments}`);

  console.log("\n🎉 ¡Seed completado exitosamente!");
  console.log("\n🔑 CREDENCIALES DE ACCESO:");
  console.log("📧 Email: admin@admin.com");
  console.log("🔒 Password: admin");
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("📦 Conexión a la base de datos cerrada.");
  });

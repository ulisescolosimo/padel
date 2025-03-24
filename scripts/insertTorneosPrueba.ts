const mongoose = require("mongoose");
const Tournament = require("../models/Tournament");

const MONGODB_URI =
  "mongodb+srv://colosimo101:behind98@cluster0.rodqd.mongodb.net/reserva_padel_db?retryWrites=true&w=majority&appName=Cluster0";

const run = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    const createdBy = new mongoose.Types.ObjectId(); // ID de prueba, reemplazalo si querés

    const torneos = Array.from({ length: 10 }).map((_, i) => ({
      name: `Torneo de prueba ${i + 1}`,
      description: "Torneo de pádel de prueba para testear el sistema",
      rules: "Reglas estándar de pádel",
      prizes: "Medallas y remeras",
      date: new Date(Date.now() + (i + 1) * 86400000), // Uno por día
      minLevel: ["Iniciación", "Intermedio", "Avanzado"][i % 3],
      pricePerPair: 15000,
      totalPlaces: 8,
      location: {
        name: `Club Padel Test ${i + 1}`,
        city: "Buenos Aires",
      },
      participants: [],
      status: "draft",
      createdBy,
      createdAt: new Date(),
    }));

    await Tournament.insertMany(torneos);
    console.log("Torneos de prueba insertados con éxito ✅");
    process.exit(0);
  } catch (err) {
    console.error("Error insertando torneos:", err);
    process.exit(1);
  }
};

run();

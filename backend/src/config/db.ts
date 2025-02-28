import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Vérifie si les variables d'environnement sont définies
if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_NAME
) {
  console.error("Database configuration is missing in environment variables.");
  process.exit(1);
}

// Crée une instance de DataSource pour PostgreSQL
const AppDataSource = new DataSource({
  type: "postgres", // Type de base de données
  host: process.env.DB_HOST, // Hôte de la base de données
  port: parseInt(process.env.DB_PORT!), // Port de la base de données
  username: process.env.DB_USER, // Nom d'utilisateur
  password: process.env.DB_PASSWORD, // Mot de passe
  database: process.env.DB_NAME, // Nom de la base de données
  entities: [__dirname + "/../models/*.{js,ts}"], // Chemin vers les entités (modèles)
  synchronize: true, // Synchronise automatiquement les schémas (à utiliser uniquement en développement)
  logging: true, // Active les logs SQL (optionnel)
});

// Fonction pour se connecter à PostgreSQL
const connectDB = async () => {
  try {
    // Vérifie si une connexion existe déjà
    if (AppDataSource.isInitialized) {
      console.log("Already connected to PostgreSQL");
      return;
    }

    // Connexion à PostgreSQL
    await AppDataSource.initialize();
    console.log("Connecté à PostgreSQL");
  } catch (error) {
    console.error("Erreur de connexion à PostgreSQL :", error);
    // Exit ou stratégie de reconnexion selon le cas
    process.exit(1);
  }
};

export { AppDataSource, connectDB };

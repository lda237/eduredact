const crypto = require('crypto');
const fs = require('fs');

// Générer une clé secrète aléatoire
const secret = crypto.randomBytes(32).toString('base64');

// Créer une chaîne au format JWT_SECRET=...
const jwtSecretLine = `JWT_SECRET=${secret}`;

// Écrire la clé secrète dans un fichier .env
fs.writeFile('.env', jwtSecretLine, (err) => {
  if (err) {
    console.error('Une erreur est survenue lors de la création du fichier :', err);
    return;
  }
  console.log('Clé secrète générée avec succès et enregistrée dans .env');
});
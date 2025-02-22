// frontend/src/services/estimateModel.ts
import * as tf from '@tensorflow/tfjs';

// Données d'entraînement
const trainingData = {
  serviceType: [0, 1, 2], // 0: Rédaction, 1: Traduction, 2: Correction
  pageCount: [10, 5, 20],
  urgency: [0, 1, 0], // 0: Standard, 1: Express
  price: [50000, 15000, 40000],
  time: [20, 5, 10],
};

// Convertir les données en tenseurs
const inputs = tf.tensor2d([
  [trainingData.serviceType[0], trainingData.pageCount[0], trainingData.urgency[0]],
  [trainingData.serviceType[1], trainingData.pageCount[1], trainingData.urgency[1]],
  [trainingData.serviceType[2], trainingData.pageCount[2], trainingData.urgency[2]],
]);

const outputs = tf.tensor2d([trainingData.price, trainingData.time], [3, 2]).transpose();

// Créer un modèle de régression linéaire
const model = tf.sequential();
model.add(tf.layers.dense({ units: 2, inputShape: [3] }));

// Compiler le modèle
model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

// Entraîner le modèle
async function trainModel() {
  await model.fit(inputs, outputs, { epochs: 100 });
  console.log('Modèle entraîné !');
}

// Fonction pour prédire le prix et le délai
export async function predictEstimate(serviceType: number, pageCount: number, urgency: number) {
  await trainModel(); // Entraîner le modèle avant de prédire

  const prediction = model.predict(
    tf.tensor2d([[serviceType, pageCount, urgency]])
  ) as tf.Tensor;

  const [price, time] = prediction.dataSync();
  return { price, time };
}
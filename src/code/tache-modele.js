import { bdFirestore, collUtil, collTaches } from './init';
import { collection, getDoc, getDocs, addDoc, Timestamp, orderBy, deleteDoc, doc, query } from "firebase/firestore"; 

/**
 * Créer une nouvelle tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {Object} tache document à ajouter aux tâches de l'utilisateur
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function creer(uid, tache) {
  // On ajoute la propriété 'date' à l'objet représentant la tâche en prenant la 
  // date du serveur Firestore.
  tache.date = Timestamp.fromDate(new Date());
  let collRef = collection(bdFirestore, collUtil, uid, collTaches);
  let docRef = await addDoc(collRef, tache);
  let nouveauDoc = await getDoc(docRef);
  return {id: nouveauDoc.id, ...nouveauDoc.data()};
}

/**
 * Obtenir toutes les tâches d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */
export async function lireTout(uid) {
  return getDocs(collection(bdFirestore, collUtil, uid, collTaches)).then(
    qs  => qs.docs.map(doc => ({id: doc.id, ...doc.data()})) 
  );
}

/**
 * Supprimer un tache pour l'utilisateur connecté
 * @param {string} uid : id Firebase Auth de l'utilisateur connecté
 * @param {string} idtache : id du document correspondant au tache à supprimer
 * @returns {Promise<void>} : promesse contenant rien
 */
 export async function supprimer(uid, idtache) {
  let refDoc = doc(bdFirestore, "memo", uid, "taches", idtache);
  return await deleteDoc(refDoc)
}

export async function lireToutTache(uid) {
  return getDocs(collection(bdFirestore, collUtil, uid, collTaches), orderBy("texte")).then(
    qs  => qs.docs.map(doc => ({id: doc.id, ...doc.data()})) 
  );
}
export async function lireToutDate(uid) {
  return getDocs(collection(bdFirestore, collUtil, uid, collTaches), orderBy("date")).then(
    qs  => qs.docs.map(doc => ({id: doc.id, ...doc.data()})) 
  );
}
import Tache from './Tache';
import './Taches.scss';
import * as tacheModele from '../code/tache-modele';
import { useEffect, useState } from 'react';
import { orderBy } from 'firebase/firestore';

export default function Taches({etatTaches, utilisateur}) {
  const uid = utilisateur.uid;
  const [taches, setTaches] = etatTaches;
  const [ordre, setOrdre] = useState('asc');

  /**
   * On cherche les tâches une seule fois après l'affichage du composant
   */
   useEffect(() => 
   tacheModele.lireTout(uid, orderBy("date", "desc")).then(
     taches => setTaches(taches)
   )
 , [uid, setTaches]);

  function gererOrdreTache(){
    if(ordre == "asc"){
      setOrdre("desc");
    } else {
      setOrdre("asc");
    }
    
    tacheModele.lireTout(uid, orderBy("texte", ordre)).then(
    taches => setTaches(taches));
  }

  function gererOrdreAjout(){
    if(ordre == "asc"){
      setOrdre("desc");
    } else {
      setOrdre("asc");
    }

    tacheModele.lireTout(uid, orderBy("date", ordre)).then(
    taches => setTaches(taches));   
  }

  /**
   * Gérer le formulaire d'ajout de nouvelle tâche en appelant la méthode 
   * d'intégration Firestore appropriée, puis actualiser les tâches en faisant 
   * une mutation de l'état 'taches'.
   * @param {string} uid Identifiant Firebase Auth de l'utilisateur connecté
   * @param {Event} e Objet Event JS qui a déclenché l'appel
   */
  function gererAjoutTache(uid, e) {
    // Prévenir le formulaire d'être soumit (et de faire une requête HTTP 
    // qui causerait une actualisation de la page !!!)
    e.preventDefault();
    // Récupérer la valeur de la boîte de texte
    const texte = e.target.texteTache.value;
    // Si le texte est vide, oublie ça ;-)
    if(texte.trim() !== '') {
      // Bonne idée : vider le formulaire pour la prochaine tâche
      e.target.reset();
      // Insérer la tâche dans Firestore
      tacheModele.creer(uid, {texte: texte, completee: false}).then(
        // Actualiser l'état des taches en remplaçant le tableau des taches par 
        // une copie du tableau auquel on joint la tâche qu'on vient d'ajouter 
        // dans Firestore (et qui est retournée par la fonction creer()).
        tache => setTaches([tache, ...taches])
      );
    }
  }

  function supprimerTache(idTache) {
    // Utiliser le modèle des taches pour supprimer la tache dans Firestore
    tacheModele.supprimer(uid, idTache).then(
      () => setTaches(taches.filter(
        tache => tache.id !== idTache
      ))
    );
  }

  function modifierTache(idTache, complet) {
    const lesModifs = {
      completee: complet
    };
    tacheModele.modifier(uid, idTache, lesModifs).then(
      () => setTaches(taches.map(
        tache => {
          if(tache.id === idTache) {
            tache.completee = complet;
          }
          return tache;
        }
      ))
    );
  }

  return (
    <section className="Taches">
      <form onSubmit={e => gererAjoutTache(uid, e)}>
        <input 
          type="text"   
          placeholder="Ajoutez une tâche ..." 
          name="texteTache"
          autoComplete="off" 
          autoFocus={true} 
        />
      </form>
      <div className="titre-liste-taches">
        <span className="texte" onClick={gererOrdreTache}>Tâche</span>
        <span className="date" onClick={gererOrdreAjout}>Date d'ajout</span>
      </div>
      <div className="liste-taches">
        {
          taches.map(tache => <Tache key={tache.id} {... tache} supprimerTache={supprimerTache} modifierTache={modifierTache}/>)
        }
      </div>
    </section>
  );
}
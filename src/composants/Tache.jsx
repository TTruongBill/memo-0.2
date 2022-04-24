import './Tache.scss';
// La fonction formaterDateEtHeure est exportée par défaut dans le fichier util.js
// c'est la raison pour laquelle on peut l'importer sans les accolades {} ;-)
import formaterDateEtHeure from '../code/util';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TacheSupprime from "./TacheSupprime";
import { useState } from 'react';

export default function Tache({ id, texte, date, completee, supprimerTache, modifierTache}) {
  const [ouvert, setOuvert] = useState(false);
  const [complet, setComplet] = useState(completee);

  function gererSoumettre() {
    // Appeler la fonction de taches qui gère la suppression dans Firestore
    supprimerTache(id);
    setOuvert(false);
  }

  if(complet == true){
    setComplet("completee");
  }

  function gererModifierTache() {
    if(completee == true) {
      completee = false;
      setComplet("");
    } else if(completee == false){
      completee = true;
      setComplet("completee");
    }
    modifierTache(id, completee);
  }
  

  return (
    <div className={"Tache "  + complet} >
      <IconButton color="success" className='btn-padding-reduit-gauche' onClick={gererModifierTache}>
        <CheckCircleIcon />
      </IconButton>
      <span className="texte">{texte}</span>
      <span className="date">({formaterDateEtHeure(date)})</span>
      <TacheSupprime ouvert={ouvert} setOuvert={setOuvert} gererSoumettre={gererSoumettre} />
      <IconButton color="error" className='btn-padding-reduit-droite' onClick={() => setOuvert(true)}>
      <RemoveCircleIcon />     
      </IconButton>

    </div>
  );
}
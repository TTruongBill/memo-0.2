import './Tache.scss';
// La fonction formaterDateEtHeure est exportée par défaut dans le fichier util.js
// c'est la raison pour laquelle on peut l'importer sans les accolades {} ;-)
import formaterDateEtHeure from '../code/util';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TacheSupprime from "./TacheSupprime";
import { useState } from 'react';

export default function Tache({id, texte, completee, date, supprimerTache}) {
  const [ouvert, setOuvert] = useState(false);

  function gererSoumettre() {
    // Appeler la fonction de ListeDossiers qui gère la suppression dans Firestore
    supprimerTache(id);
  }

  return (
    <div className="Tache">
      <IconButton color="success" className='btn-padding-reduit-gauche'>
        <CheckCircleIcon />
      </IconButton>
      <span className="texte">{texte}</span>
      <span className="date">({formaterDateEtHeure(date)})</span>
      <IconButton color="error" className='btn-padding-reduit-droite' onClick={() => setOuvert(true)}>
        <RemoveCircleIcon />
      </IconButton>
      <TacheSupprime ouvert={ouvert} setOuvert={setOuvert} gererSoumettre={gererSoumettre}></TacheSupprime>
    </div>
  );
}
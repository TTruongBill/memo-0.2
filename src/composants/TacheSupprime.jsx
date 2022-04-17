import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function TacheSupprime({ouvert, setOuvert, gererSoumettre}) {
    
    const gererFermer = () => {
        setOuvert(false);
    };

    return (
        <div>
        <Dialog open={ouvert} onClose={gererFermer}>
            <DialogTitle>Voulez-vous effacer la tache?</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Si vous acceptez, vous ne pourrez plus retrouver votre tache.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={gererFermer}>Annuler</Button>
            <Button onClick={gererSoumettre}> Soumettre</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

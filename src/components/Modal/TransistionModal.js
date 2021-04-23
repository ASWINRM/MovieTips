import {React} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Reactplayer from 'react-player'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#212121",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closebutton:{
    position:'relative',
    left:"100%",
    backgroundColor:"transparent",
    fontSize:"1.5rem",
    borderRadius:"50%",
    marginBottom:"2px",
    
    
  }
}));

const TransistionModal=(props)=> {
  const classes = useStyles();
  
  return (
    <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
              <button className={classes.closebutton} onClick={()=>props.handleClose()}>x</button>
              <div>
                  <Reactplayer
                    controls={true}
                    url={props.videolink}
                  />
                  
              </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransistionModal;
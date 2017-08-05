import firebase from 'firebase';
  
import firebaseConfig from './firebaseConfig';

const fire = firebase.initializeApp(firebaseConfig);

export default fire;

import firebase from 'firebase';
import { database } from 'services';
import { DBUser } from 'types';

const signInByGoogle = async (): Promise<DBUser | null > => {
  const provider = new firebase.auth.GoogleAuthProvider();


  const result = await firebase.auth().signInWithPopup(provider);

  const { user } = result;
  if (user) {
    let userData = await database.getUserInfo(user.uid);
    if (!userData.id) {
      userData = await database.createUser(
        user.uid,
        user.displayName || '',
        'ru',
        user.photoURL || ''
      );
    }
    return userData;
  }
    return null;
};

export default signInByGoogle;

import firebase from 'firebase';
import { database } from 'services';
import { DBUser } from 'types';
import i18n from 'i18next';

const signInByGoogle = async (): Promise<DBUser | null > => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const lang = i18n.language;

  const result = await firebase.auth().signInWithPopup(provider);

  const { user } = result;
  if (user) {
    let userData = await database.getUserInfo(user.uid);
    if (!userData.id) {
      userData = await database.createUser(
        user.uid,
        user.displayName || '',
        lang,
        user.photoURL || ''
      );
    }
    return userData;
  }
    return null;
};

export default signInByGoogle;

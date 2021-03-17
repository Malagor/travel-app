import firebase from 'firebase';

const signInByGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const result = await firebase.auth().signInWithPopup(provider);

  const dataUser = result.additionalUserInfo;

  const { user } = result;
  console.log('user', user);
  if (user) {
    // получили  user.uid
    // го редирект
    console.log('userID', user.uid);
  } else {
    console.log('Error: uid is not defined');
  }
};

export default signInByGoogle;

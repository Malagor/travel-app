import firebase from 'firebase';

const signInByGoogle = async () => {
  console.log('singInByGoogle');

  const provider = new firebase.auth.GoogleAuthProvider();

  const result = await firebase.auth().signInWithPopup(provider);

  console.log(' dataUser', result);
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

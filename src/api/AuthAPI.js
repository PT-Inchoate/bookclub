// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/storage';

// import { usersCollection, reviewsCollection,messagesCollection } from '../firebase';
// const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// export const registerUser = async ({ email, password, username }) => {
//     try {
//         const response = await firebase.auth().createUserWithEmailAndPassword(email,password);
//         const {user} = response;

//         const userProfile = {
//             uid: user.uid,
//             email,
//             username,
//         };

//         await usersCollection.doc(user.uid).set(userProfile);
//         firebase.auth().currentUser.sendEmailVerification(null);
//         return { isAuth: true, user: userProfile }
//     } catch(error){
//         return { error: error.message}
//     }
// }


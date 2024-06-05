// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth } from 'firebase/auth';
import firebaseConfig from './firebaseConfig.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

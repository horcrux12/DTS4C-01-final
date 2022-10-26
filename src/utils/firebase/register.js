import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './base';

export const signingUp = async (email, password) => {
  try {
    const useClient = await createUserWithEmailAndPassword(auth, email, password);
    return {
      error: false,
      data: useClient.user,
    };
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};

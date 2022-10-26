import { auth } from "./base";
import { signInWithEmailAndPassword } from 'firebase/auth';

export const signingIn = async (email, password) => {
    try {
      const useClient = await signInWithEmailAndPassword(auth, email, password);
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
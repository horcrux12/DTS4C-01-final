import { signOut } from "firebase/auth";
import { auth } from "./base";

export const singingOut = async () => {
    try {
      const useClient = await signOut(auth);
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
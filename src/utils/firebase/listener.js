import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./base"

export const listener = (callBack) => {
    onAuthStateChanged(auth, (user) => {
        callBack(user ? true:false)
    })
}
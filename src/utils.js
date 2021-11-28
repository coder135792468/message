import { auth } from "./firebase";
const getID = () => {
  return auth.currentUser.uid;
};
export { getID };

import React from "react";

import { getDatabase, set, ref, update, onValue, Database } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { os } from "@Native/Os";

interface IFirebaseContext {
  app: FirebaseApp | null;
  auth: Auth | null;
  database: Database | null;
  firebaseVoid: (cb: (auth: Auth, db: Database) => void) => void;
}

const FirebaseContext = React.createContext<IFirebaseContext>({
  app: null,
  auth: null,
  database: null,
  firebaseVoid(cb) {},
});

export const FirebaseProvider = (props: React.PropsWithChildren) => {
  const [app, setApp] = React.useState<FirebaseApp | null>(null);
  const [auth, setAuth] = React.useState<Auth | null>(null);
  const [database, setDatabase] = React.useState<Database | null>(null);

  const config = React.useMemo(
    () => ({
      apiKey: "AIzaSyB0z4WO8zpqu2Tf9tYJlYpc71pjSREBhaA",
      databaseURL: "https://mmrl-80afa-default-rtdb.europe-west1.firebasedatabase.app/",
      projectId: "mmrl-80afa",
      storageBucket: "mmrl-80afa.appspot.com",
      appId: "1:343713662395:android:e20d7b9250788d64f5b09e",
    }),
    []
  );

  React.useEffect(() => {
    setApp(initializeApp(config));
  }, []);

  React.useEffect(() => {
    if (app) {
      setAuth(getAuth(app));
      setDatabase(getDatabase(app));
    }
  }, [app]);

  const firebaseVoid = (cb: (auth: Auth, db: Database) => void) => {
    if (auth && database) {
      cb(auth, database);
    }
  };

  return <FirebaseContext.Provider value={{ app, auth, database, firebaseVoid }} children={props.children} />;
};

export const useFirebase = () => React.useContext(FirebaseContext);

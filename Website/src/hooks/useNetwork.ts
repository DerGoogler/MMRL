import React from "react";

export const useNetwork = () => {
  const [isOnline, setNetwork] = React.useState(window.navigator.onLine);

  const updateNetwork = () => {
    setNetwork(window.navigator.onLine);
  };

  React.useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  }, [isOnline]);

  return { isNetworkAvailable: isOnline };
};

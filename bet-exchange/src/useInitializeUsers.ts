import { useEffect } from "react";
import { User } from "./Types";

const useInitializeUsers = () => {
  useEffect(() => {
    const keysWithSampleData = {
      Users: [
        { id: 1, username: "buyer123", role: "buyer" },
        { id: 2, username: "seller456", role: "seller" },
      ] as User[],
      AuthUser: null,
    };

    Object.entries(keysWithSampleData).forEach(([key, value]) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });

    console.log("Local storage initialized.");
  }, []);
};

export default useInitializeUsers;

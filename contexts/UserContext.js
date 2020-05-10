import React from "react";

const UserContext = React.createContext({
  user: {
    remainingDeletions: 0,
    adPosition: 0,
    password: "",
  },
  setUser: () => {},
});

export default UserContext;

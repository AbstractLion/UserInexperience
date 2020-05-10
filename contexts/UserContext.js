import React from "react";

const UserContext = React.createContext({
  user: {
    remainingDeletions: 0,
    adPosition: 0,
  },
  setUser: () => {},
});

export default UserContext;

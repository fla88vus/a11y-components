// GroupContext.ts
import * as React from 'react';

export interface GroupContextValue {
  name?: string;
  describedBy?: string;
  disabled?: boolean;
}

const GroupContext = React.createContext<GroupContextValue | null>(null);

export const useGroupContext = () => {
  return React.useContext(GroupContext);
};

export const GroupProvider = GroupContext.Provider;

import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch
} from 'react';

import { ProviderChildren } from '../types/interfaces';

type INavigationContext = {
  coolTabletScreen: string,
  setCoolTabletScreen: Dispatch<SetStateAction<any>>
};

const Defaults = {
  coolTabletScreen: 'cats',
  setCoolTabletScreen: (): void => {}
};

export const NavigationContext = createContext<INavigationContext>(Defaults);

export const NavigationProvider = ({ children }: ProviderChildren) => {
  const [coolTabletScreen, setCoolTabletScreen] = useState<any>(Defaults.coolTabletScreen);

  return (
    <NavigationContext.Provider value={
      {
        coolTabletScreen: coolTabletScreen,
        setCoolTabletScreen: setCoolTabletScreen,
      }
    }>
      { children }
    </NavigationContext.Provider>
  );
};
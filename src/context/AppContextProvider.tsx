import React, { ComponentProps, FC } from 'react';
import { StatusProvider } from './Status';
import { UserProvider } from './UserContext';
import { StatusMessageProvider } from './StatusMessage';
import { NavigationProvider } from './Navigation';
import { AuthProvider } from './Auth';
import { SigningProvider } from './Signing';
import { MetamaskStateProvider } from "use-metamask";

export const combineComponents = (...components: FC[]): FC => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};

// Order is important here!
const providers = [
  StatusProvider,
  MetamaskStateProvider,
  StatusMessageProvider,
  SigningProvider,
  AuthProvider,
  NavigationProvider,
  UserProvider
];

export const AllProviders = combineComponents(...providers);
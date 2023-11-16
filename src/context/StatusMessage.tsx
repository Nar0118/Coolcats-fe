import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch
} from 'react';

import { ProviderChildren } from '../types/interfaces';

export type StatusMessageType = {
  type: string,
  message: string,
  callback?: Function,
  confirm?: Function
};

type IStatusMessageContext = {
  statusMessage: StatusMessageType | null,
  setStatusMessage: Dispatch<SetStateAction<any>>,
  loading: boolean,
  setStatusMessageLoading: Function,
  disabled: boolean,
  setStatusMessageDisabled: Function
};

export const StatusMessageContext = createContext<IStatusMessageContext>({
  statusMessage: null,
  setStatusMessage: (): void => {},
  loading: false,
  setStatusMessageLoading: (): void => {},
  disabled: false,
  setStatusMessageDisabled: (): void => {}
});

export const StatusMessageProvider = ({ children }: ProviderChildren) => {
  const [ statusMessage, setStatusMessage ] = useState<StatusMessageType | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ disabled, setDisabled ] = useState<boolean>(false);

  const setStatusMessageLoading = (b: boolean) => {
    setLoading(b);
  };

  const setStatusMessageDisabled = (b: boolean) => {
    setDisabled(b);
  };

  return (
    <StatusMessageContext.Provider value={
      {
        statusMessage: statusMessage,
        setStatusMessage: setStatusMessage,
        loading: loading,
        setStatusMessageLoading: setStatusMessageLoading,
        disabled: disabled,
        setStatusMessageDisabled: setStatusMessageDisabled
      }
    }>
      { children }
    </StatusMessageContext.Provider>
  );
};

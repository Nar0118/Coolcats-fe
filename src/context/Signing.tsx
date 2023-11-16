import { createContext, useEffect, useState, useContext } from 'react';
import { useMetamask } from "use-metamask";
import { StatusContext, EnumStatus } from './Status';

type EIP712 = {
  type: string,
  name: string,
  value: any
};

type Context = {
  signData: Function,
  signMessage: Function,
  signData_EIP712: Function,
  handleSigningError: Function,
  isSigning: boolean,
  error: any
};

const initialContext = {
  signData: (data: any): void => {},
  signMessage: (message: string): void => {},
  signData_EIP712: (data: any): void => {},
  isSigning: false,
  handleSigningError: (err: any): void => {},
  error: null
};

export const SigningContext = createContext<Context>(initialContext);

interface Props {
  children: any
}

export const SigningProvider = ({ children }: Props) => {
  // Metamask Hook
  const { connect, metaState } = useMetamask();
  const { setStatus, unSetStatus, isStatus, lastStatusChange, setTemporaryStatus } = useContext(StatusContext);
  const [ error, setError ] = useState<any>(initialContext.error);
  const [ isSigning, setSigning ] = useState<boolean>(initialContext.isSigning);

  const handleErrorCallback = (error: any, errorCallback?: Function) => {
    if (error) {
      setError(error);
  
      if (errorCallback) {
        errorCallback(error);
      }
      unSetStatus(EnumStatus.SIGNING_DATA);
      unSetStatus(EnumStatus.SIGNING_OPEN);
      setTemporaryStatus(EnumStatus.SIGNING_CLOSED);
    }
  };
  
  // Sign some specific data and perform a callback
  const signData_EIP712 = (data: EIP712[], callback: Function, errorCallback?: Function) => {
    setStatus(EnumStatus.SIGNING_OPEN);
    setStatus(EnumStatus.SIGNING_DATA);

    if (!errorCallback) {
      errorCallback = handleSigningError;
    }

    setError(null);

    metaState.web3.currentProvider.sendAsync({
      method: 'eth_signTypedData',
      params: [
        data,
        metaState.account[0]
      ],
      from: metaState.account[0],
    }, (err: any, sig: any) => {
      if (err) {
        setError(err);
      }

      if (err && errorCallback) {
        errorCallback(err);
      } else {
        callback(sig.result);
      }

      unSetStatus(EnumStatus.SIGNING_DATA);
      unSetStatus(EnumStatus.SIGNING_OPEN);
      setTemporaryStatus(EnumStatus.SIGNING_CLOSED);
    });
  };

  const signMessage = (message: string, callback: Function, errorCallback?: Function) => {
    setStatus(EnumStatus.SIGNING_OPEN);
    setStatus(EnumStatus.SIGNING_DATA);

    if (!errorCallback) {
      errorCallback = handleSigningError;
    }

    setError(null);

    metaState.web3.eth.personal.sign(
      metaState.web3.utils.utf8ToHex(message),
      metaState.account[0],
    ).then((sig: any) => {
      callback(sig);
      unSetStatus(EnumStatus.SIGNING_DATA);
      unSetStatus(EnumStatus.SIGNING_OPEN);
      setTemporaryStatus(EnumStatus.SIGNING_CLOSED);
    }).catch((err: any) => {
      handleErrorCallback(err, errorCallback);
    });
  }

  const signData = signData_EIP712;

  const handleSigningError = (error: any, callback?: Function) => {
    unSetStatus(EnumStatus.SIGNING_OPEN);
    unSetStatus(EnumStatus.SIGNING_DATA);
    setTemporaryStatus(EnumStatus.SIGNING_CLOSED);

    if (error && error.code === 4001) {
      if (callback) {
        callback();
      }
    } else {
      console.error(error);
    }
  };

  useEffect(() => {
    if (lastStatusChange === EnumStatus.SIGNING_OPEN) {
      setSigning(true);
    }
    if (lastStatusChange === EnumStatus.SIGNING_CLOSED) {
      setSigning(false);
    }
  }, [lastStatusChange])

  return (
    <SigningContext.Provider value={{
      signData: signData,
      signMessage: signMessage,
      signData_EIP712: signData_EIP712,
      isSigning: isSigning,
      handleSigningError: handleSigningError,
      error: error
    }}>
      { children }
    </SigningContext.Provider>
  );
};
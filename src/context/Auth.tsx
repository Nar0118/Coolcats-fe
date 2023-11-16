import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import Web3 from "web3";
import { useMetamask } from "use-metamask";
import detectEthereumProvider from '@metamask/detect-provider';
import { ProviderChildren } from '../types/interfaces';
import abi from './abi.json';
import { StatusContext, EnumStatus } from './Status';
import { 
  getNonce,
  Auth_login,
  Auth_logout
} from '../utils/Api';
import { SigningContext } from './Signing';

type IAuthContext = {
  login: any | null,
  logout: any | null,
  isAuthenticated: boolean,
  isLoggedIn: boolean,
  networkId: string | null,
  user: any,
  authUserProperties: any,
  isCorrectNetwork: Function
};

const Defaults = {
  isLoggedIn: false,
  isAuthenticated: false,
  login: (): void => {},
  logout: (): void => {},
  networkId: null,
  user: null,
  authUserProperties: null,
  isCorrectNetwork: (): void => {}
};

export const AuthContext = createContext<IAuthContext>(Defaults);

export const AuthProvider = ({ children }: ProviderChildren) => {
  const { connect, metaState } = useMetamask();
  const { isStatus, setStatus, unSetStatus } = useContext(StatusContext);
  const { signMessage } = useContext(SigningContext);
  const [user, setUser] = useState<{ chain: any; account: any } | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(false);
  const [authUserProperties, setAuthUserProperties] = useState<any>(Defaults.authUserProperties);
  const [contractAddress, setContractAddress] = useState<any>('0xaa040e38ea003f9894d1cf6e4ced729536a4a1a9');

  // Reconnect the user on refresh
  const checkForExistingConnection = async () => {
    const provider = await detectEthereumProvider() as any;
    
    if (provider && provider.selectedAddress) {
      try {
        await connect(Web3);
      } catch (err: any) {}
    }
  };

  // On mount, check for an existing connection
  useEffect(() => {
    checkForExistingConnection();
  }, []);

  // Set the network id and attempt to log the user in
  useEffect(() => {
    setNetworkId(metaState.chain.id);
    if(!isStatus(EnumStatus.IS_AUTHENTICATED)
      && !isStatus(EnumStatus.AUTHENTICATING)
      && !isStatus(EnumStatus.IS_LOGGED_IN)
    ) {
      _login(metaState);
    }
  }, [metaState.chain]);

  useEffect(() => {
    // Log the user out if they disconnect
    if (metaState.account.length === 0
      && isStatus(EnumStatus.IS_AUTHENTICATED)
    ) {
      logout();
    }
  }, [metaState.account]);

  // Logs in the user and attempts to connect wallet if
  // user is not currently connected
  const login = async () => {
      if (metaState.account.length > 0) {
        _login(metaState);
      } else {
        if (!metaState.isConnected) {
          try {
            await connect(Web3);
          } catch (error) {}
        }
      }
  }

  const errorInAuth = (message: string, error: any) => {
    unSetStatus(EnumStatus.AUTHENTICATING);
    unSetStatus(EnumStatus.GETTING_NONCE);
    console.error(message, error);
  };

  const _login = (state: any) => {
    // If the chain id is null, metamask is locked,
    // so dont do anything
    if (state.chain.id === null) {
      return;
    }

    setUser({ chain: state.chain, account: state.account[0] });
    setNetworkId(state.chain.id);
    unSetStatus(EnumStatus.NETWORK_ERROR);

    if (state.chain.id === process.env.REACT_APP_NETWORKID) {
      setStatus(EnumStatus.GETTING_NONCE);

      getNonce().then((res: any) => {
        unSetStatus(EnumStatus.GETTING_NONCE);

        if (res.status !== 200) {
          throw new Error('Error getting nonce, status incorrect ' + res.status);
        }

        signMessage(
          'Sign this nonce to login: ' + res.data.nonce,
          (sig: string) => {
            setStatus(EnumStatus.AUTHENTICATING);
            Auth_login(res.data.nonce, metaState.account[0], sig).then((res: any) => {
              if (res.status !== 201) {
                throw new Error('Error logging in, status incorrect ' + res.status);
              }

              setAuthUserProperties(res.data.properties);
              setStatus(EnumStatus.IS_AUTHENTICATED);
              setStatus(EnumStatus.IS_LOGGED_IN);
              unSetStatus(EnumStatus.AUTHENTICATING);

            }).catch((error: any) => {
              errorInAuth('Error logging in', error);
            })
          },
          (error: any) => {
            errorInAuth('Error logging in', error);
          }
        );

      }).catch((error: any) => {
        errorInAuth('Error getting nonce', error);
      });
    } else {
      setStatus(EnumStatus.NETWORK_ERROR);
    }
  };

  // Logout the user (does not disconnect the wallet)
  const logout = () => {
    unSetStatus(EnumStatus.IS_AUTHENTICATED);
    unSetStatus(EnumStatus.AUTHENTICATING);
    unSetStatus(EnumStatus.IS_LOGGED_IN);
    setUser(Defaults.user);
    setStatus(EnumStatus.LOGGING_OUT);
    Auth_logout().then(() => {
      unSetStatus(EnumStatus.LOGGING_OUT);
    });
  }

  const isCorrectNetwork = () => {
    return networkId === process.env.REACT_APP_NETWORKID;
  };

  // Build the contract once we have web3
  useEffect(() => {
    if(metaState.web3) {
      buildContract(metaState.web3);
    }
  }, [metaState.web3]);

  // Build the contract from the ABI
  const buildContract = async(web3: any) => {
    if (abi && Web3) {
        // eslint-disable-next-line max-len
        setContract(new web3.eth.Contract(abi, contractAddress));

        // check we have a contract before calling it
        return !!contract;
    }
  }

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: isStatus(EnumStatus.IS_LOGGED_IN),
        isAuthenticated: isStatus(EnumStatus.IS_AUTHENTICATED),
        login: login,
        logout: logout,
        networkId: networkId,
        user: user,
        authUserProperties: authUserProperties,
        isCorrectNetwork: isCorrectNetwork
      }
    }>
      { children }
    </AuthContext.Provider>
  );
};
import { createContext, Dispatch, SetStateAction, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {useMetamask} from "use-metamask";
import { useHistory } from "react-router-dom";
import { StatusMessageContext } from './StatusMessage';
import { NavigationContext } from './Navigation';
import { SigningContext } from './Signing';
import { AuthContext } from './Auth';
import { StatusContext, EnumStatus } from './Status';
import {
  NftListType,
  ISelectedNFT,
  NFT
} from '../types/interfaces'
import {
  getCats,
  getCat,
  getGallery,
  Collection,
  CollectionParams,
  Auth_updateUser
} from '../utils/Api';
const DEFAULT_ACTIVE_CAT_TRAIT = '';

type Context = {
  coolTabletOpen: boolean,
  setCoolTabletOpen: Dispatch<SetStateAction<any>>,
  coolTabletScreen: string,
  setCoolTabletScreen: Dispatch<SetStateAction<any>>,
  newsOpen: boolean,
  setNewsOpen: Dispatch<SetStateAction<any>>,
  menuOpen: boolean,
  setMenuOpen: Dispatch<SetStateAction<any>>,
  storeOpen: boolean,
  setStoreOpen: Dispatch<SetStateAction<any>>,
  profileOpen: boolean,
  setProfileOpen: Dispatch<SetStateAction<any>>,
  gameLoaded: boolean,
  setGameLoaded: Dispatch<SetStateAction<any>>,
  navigateToHouse: Dispatch<SetStateAction<any>>,

  isSigning: boolean,

  // User
  userData: any,
  updateUserData: Function,
  setUserProfileImage: Function,
  setUserData: Dispatch<SetStateAction<any>>,

  // Cats
  activeCat: any,
  setActiveCat: Dispatch<SetStateAction<any>>,
  fetchGallery: Function,
  getCat: Function,
  currentCat: NFT | null,
  currentCatError: any,
  catTraits: string[],
  activeCatTrait: string,
  setActiveCatTrait: Dispatch<SetStateAction<string>>,
  defaultActiveCatTrait: string,
  setCurrentSearch: Dispatch<SetStateAction<string>>,
  currentSearch: any,
  defaultGallerySort: string,

  // Collections
  collections: any,
  fetchCollection: Function,
  isLoadingCollection: Function,
  getCollection: Function,
  lastLoadedCollectionTime: string
};

const initialContext = {
  coolTabletOpen: false,
  setCoolTabletOpen: (): void => {},
  coolTabletScreen: 'cats',
  setCoolTabletScreen: (): void => {},    
  newsOpen: false,
  setNewsOpen: (): void => {},
  menuOpen: false,
  setMenuOpen: (): void => {},
  storeOpen: false,
  setStoreOpen: (): void => {},
  profileOpen: false,
  setProfileOpen: (): void => {},
  gameLoaded: false,
  setGameLoaded: (): void => {},
  navigateToHouse: (): void => {},

  isSigning: false,

  // User
  userData: null,
  updateUserData: (data: any): void => {},
  setUserProfileImage: (nft: ISelectedNFT): void => {},
  setUserData: (): void => {},

  // Cats
  activeCat: null,
  setActiveCat: (): void => {},
  fetchGallery: (parameters: CollectionParams): void => {},
  getCat: (id: number): void => {},
  currentCat: null,
  currentCatError: null,
  catTraits: [],
  activeCatTrait: DEFAULT_ACTIVE_CAT_TRAIT,
  setActiveCatTrait: (): void => {},
  defaultActiveCatTrait: DEFAULT_ACTIVE_CAT_TRAIT,
  setCurrentSearch: (): void => {},
  currentSearch: "{}",
  defaultGallerySort: 'token_id_asc',

  // Collections
  collections: {},
  fetchCollection: (name: string, parameters: CollectionParams): void => {},
  isLoadingCollection: (name: string): void => {},
  getCollection: (name: string): void => {},
  lastLoadedCollectionTime: ''
};

export const UserContext = createContext<Context>(initialContext);

interface Props {
  children: any
}

export const UserProvider = ({ children }: Props) => {
  // Metamask Hook
  const history = useHistory();
  const { metaState } = useMetamask();
  const { setStatusMessage } = useContext(StatusMessageContext);
  const { coolTabletScreen, setCoolTabletScreen } = useContext(NavigationContext);
  const { isSigning } = useContext(SigningContext);
  const { isLoggedIn, networkId, isCorrectNetwork } = useContext(AuthContext);
  const { setStatus, unSetStatus, isStatus } = useContext(StatusContext);

  // React State
  const [userData, setUserData] = useState<any>(null);
  const [coolTabletOpen, setCoolTabletOpen] = useState<any>(false);
  const [menuOpen, setMenuOpen] = useState<any>(false);
  const [newsOpen, setNewsOpen] = useState<any>(false);
  const [storeOpen, setStoreOpen] = useState<any>(false);
  const [profileOpen, setProfileOpen] = useState<any>(false);
  const [gameLoaded, setGameLoaded] = useState<any>(false);

  // Collections
  const [collections, setCollections] = useState<any>({});
  const [lastLoadedCollectionTime, setCollectionLastLoaded] = useState<string>('');

  // Cats
  const [activeCat, _setActiveCat] = useState<any>(null);
  const [currentCat, setCurrentCat] = useState<NFT | null>(null);
  const [currentCatError, setCurrentCatError] = useState<any>(null);
  const [activeCatTrait, setActiveCatTrait] = useState<string>(initialContext.activeCatTrait);
  const [catTraits, setCatTraits] = useState<string[]>(initialContext.catTraits);
  const [currentSearch, _setCurrentSearch] = useState<any>(initialContext.currentSearch);

  // Grab the user wallet once we have a metastate account
  // Set the user to be authenticated
  useEffect(() => {
    if (isLoggedIn) {
      fetchCats();
    }
    if (!isLoggedIn) {
      removeCollection(NftListType.CATS);
    }
  }, [isLoggedIn]);

  // Close cool tablet if open and wrong network
  useEffect(() => {
    if (!isCorrectNetwork()) {
      setCoolTabletOpen(false);
    }
  }, [networkId]);

  const removeCollection = (name: string) => {
    let c = collections;
    if (c[name]) {
      delete c[name];
      setCollections(c);
    }
  };

  const isLoadingCollection = (name: string) => {
    return (
      typeof collections[name] !== 'undefined'
      && collections[name].loading === true
    );
  }

  /**
   * Load a specific collection from the api
   */
  const fetchCollection = (
    name: string,
    parameters?: CollectionParams
  ) => {
    let cols = collections;
    let c = new (Collection as any)();
    c.setLoading(true);

    const prev = cols[name];
    if (prev) {
      c.setLimit(prev.limit);
      c.setPage(prev.page);
      c.setParameters(prev.parameters);
    }

    cols[name] = c;
    setCollections(cols);
    setCollectionLastLoaded('');

    let mthod = getGallery;
    if (name === NftListType.CATS) {
      mthod = getCats;
    }
    if (name === NftListType.GALLERY) {
      mthod = getGallery;
    }

    if (!parameters) {
      parameters = {};
    }

    if (!parameters.limit) {
      parameters.limit = c.limit;
    }

    return mthod(parameters).then((response: any) => {
      cols = collections;
      let c;
      if (response.data) {
        c = new (Collection as any)(response.data);
      } else {
        c = new (Collection as any)(response);
      }
      c.setLoading(false);
      c.setLoaded(true);

      if (parameters) {
        c.setParameters(parameters);
        c.setPage(parameters.page || 1);
        c.setLimit(parameters.limit || c.limit);
      }

      cols[name] = c;

      setCollections(cols);
      setCollectionLastLoaded((new Date()).toString());

      return c;
    });
  };

  const setActiveCat = (cat: NFT) => {
    if (!isStatus(EnumStatus.SETTING_ACTIVE_CAT)) {
      setStatus(EnumStatus.SETTING_ACTIVE_CAT);
      setTimeout(() => {
        _setActiveCat(cat);
      }, 500);

      setTimeout(() => {
        unSetStatus(EnumStatus.SETTING_ACTIVE_CAT);
      }, 1000);
    }
  };

  function uniqueTraits(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  const fetchCats = () => {
    let params = {
      owner: metaState.account[0],
      limit: 500
    } as any;

    const r = fetchCollection(NftListType.CATS, params);
    r?.then((c: any) => {
      if (!activeCat) {
        setActiveCat(c.first());
      }

      const order = {
        cool_1: 1,
        cool_2: 2,
        wild_1: 3,
        wild_2: 4,
        classy_1: 5,
        classy_2: 6,
        exotic_1: 7,
        exotic_2: 8,
        default: 10000
      } as any;

      // Find unique trait values
      var a = c.map((cat: any) => cat.attributes.filter((at: any) => at.trait_type === 'tier').pop().value);
      setCatTraits(
        a.filter(uniqueTraits).sort((a: any, b: any) => {
          return (order[a] || order.default) - (order[b] || order.default);
        })
      );
    });
  }

  const fetchGallery = (parameters?: CollectionParams) => {
    if (!parameters) {
      parameters = {
        sortBy: initialContext.defaultGallerySort
      };
    }

    const col = getCollection(NftListType.GALLERY);
    return fetchCollection(NftListType.GALLERY, Object.assign(col.parameters, parameters));
  }

  const getCollection = (name: string) => {
    if (collections[name]) {
      return collections[name];
    }

    return new (Collection as any)();
  }

  const openTablet = (open: boolean) => {
    if(metaState.account.length > 0) {
      setCoolTabletOpen(open);
    }
  }

    const navigateToHouse = (url: string) => {
      setMenuOpen(false);
      setCoolTabletOpen(false);
      setNewsOpen(false);

      history.push(url);
    }

    const updateUserData = (data: any)  => {
      let d = userData;
      Object.entries(data).forEach(([k, v]) => {
        d[k] = v;
      });

      setUserData(d);
      setStatus(EnumStatus.UPDATE_USER);
      Auth_updateUser(data).then((response: any) => {
        unSetStatus(EnumStatus.UPDATE_USER);
      }).catch((error: any) => {
        unSetStatus(EnumStatus.UPDATE_USER);
        setUserData(userData);
        setStatusMessage({
          type: 'error',
          message: 'Sorry! There was a problem updating your info, please try again.'
        });
      });
    };

    const setUserProfileImage = (nft: ISelectedNFT) => {
      let d = userData;
      userData.profilepicture = nft;
      setStatus(EnumStatus.UPDATE_USER);
      setUserData(userData);
      unSetStatus(EnumStatus.UPDATE_USER);
    }

    const getCatFromApi = (id: number) => {
      if (isNaN(Number(id))) {
        setCurrentCatError('Token id invalid');
        return;
      }

      setStatus(EnumStatus.LOADING_CAT);

      return getCat(id).then((data: any) => {
        unSetStatus(EnumStatus.LOADING_CAT);
        setCurrentCat(data.data);
      }).catch((error: any) => {
        unSetStatus(EnumStatus.LOADING_CAT);
        setCurrentCatError(error);
      })
    };

    const setCurrentSearch = (data: any) => {
      _setCurrentSearch(JSON.stringify(data));
    };

    return (
      <UserContext.Provider value={{
        coolTabletOpen: coolTabletOpen,
        setCoolTabletOpen: openTablet,
        coolTabletScreen: coolTabletScreen,
        setCoolTabletScreen: setCoolTabletScreen,
        gameLoaded: gameLoaded,
        setGameLoaded: setGameLoaded,
        newsOpen: newsOpen,
        setNewsOpen: setNewsOpen,
        menuOpen: menuOpen,
        setMenuOpen: setMenuOpen,
        storeOpen: storeOpen,
        setStoreOpen: setStoreOpen,
        profileOpen: profileOpen,
        setProfileOpen: setProfileOpen,
        navigateToHouse: navigateToHouse,

        // User
        userData: userData,
        setUserData: setUserData,
        updateUserData: updateUserData,
        setUserProfileImage: setUserProfileImage,

        // Data signing
        isSigning: isSigning,

        // Cats
        activeCat: activeCat,
        setActiveCat: setActiveCat,
        fetchGallery: fetchGallery,
        getCat: getCatFromApi,
        currentCat: currentCat,
        currentCatError: currentCatError,
        catTraits: catTraits,
        activeCatTrait: activeCatTrait,
        setActiveCatTrait: setActiveCatTrait,
        defaultActiveCatTrait: initialContext.defaultActiveCatTrait,
        setCurrentSearch: setCurrentSearch,
        currentSearch: JSON.parse(currentSearch),
        defaultGallerySort: initialContext.defaultGallerySort,

        // Collections
        collections: collections,
        fetchCollection: fetchCollection,
        isLoadingCollection: isLoadingCollection,
        getCollection: getCollection,
        lastLoadedCollectionTime: lastLoadedCollectionTime
      }}
      >
        {children}
      </UserContext.Provider>
    );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UserConsumer = UserContext.Consumer;
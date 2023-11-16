import React, { createContext, useState, useEffect } from 'react';

export enum EnumStatus {
  NONE = 'NONE',
  CLAIMING_GOLD = 'CLAIMING_GOLD',
  CLAIM_GOLD_SUCCESS = 'CLAIM_GOLD_SUCCESS',
  AWAITING_CLAIM_GOLD_SUCCESS = 'AWAITING_CLAIM_GOLD_SUCCESS',
  BUYING_ITEMS = 'BUYING_ITEMS',
  GETTING_USER = 'GETTING_USER',
  SELLING_ITEM = 'SELLING_ITEM',
  USING_ITEM = 'USING_ITEM',
  SEARCHING_MARKETPLACE = 'SEARCHING_MARKETPLACE',
  LOADING_MARKETPLACE_CATEGORIES = 'LOADING_MARKETPLACE_CATEGORIES',
  SIGNING_DATA = 'SIGNING_DATA',
  SIGNING_OPEN = 'SIGNING_OPEN',
  SIGNING_CLOSED = 'SIGNING_CLOSED',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_USER_PROFILE_PICTURE = 'UPDATE_USER_PROFILE_PICTURE',
  UNLISTING_ITEM = 'UNLISTING_ITEM',
  LOADING_CAT = 'LOADING_CAT',
  AUTHENTICATING = 'AUTHENTICATING',
  IS_AUTHENTICATED = 'IS_AUTHENTICATED',
  GETTING_NONCE = 'GETTING_NONCE',
  IS_LOGGED_IN = 'IS_LOGGED_IN',
  LOGGING_OUT = 'LOGGING_OUT',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SETTING_ACTIVE_CAT = 'SETTING_ACTIVE_CAT'
}

type Context = {
  toggleStatus: Function,
  setStatus: Function,
  unSetStatus: Function,
  isStatus: Function,
  setTemporaryStatus: Function,
  statuses: any,
  lastStatusChange: EnumStatus
};

const initialContext = {
  toggleStatus: (status: EnumStatus): void => {},
  isStatus: (status: EnumStatus): void => {},
  setStatus: (status: EnumStatus): void => {},
  unSetStatus: (status: EnumStatus): void => {},
  setTemporaryStatus: (status: EnumStatus): void => {},
  statuses: {
    CLAIMING_GOLD: false,
    CLAIM_GOLD_SUCCESS: false,
    AWAITING_CLAIM_GOLD_SUCCESS: false,
    BUYING_ITEMS: false,
    GETTING_USER: false,
    SELLING_ITEM: false,
    USING_ITEM: false,
    SEARCHING_MARKETPLACE: false,
    LOADING_MARKETPLACE_CATEGORIES: false,
    SIGNING_DATA: false,
    SIGNING_OPEN: false,
    SIGNING_CLOSED: false,
    UPDATE_USER: false,
    UPDATE_USER_PROFILE_PICTURE: false,
    UNLISTING_ITEM: false,
    LOADING_CAT: false,
    AUTHENTICATING: false,
    IS_AUTHENTICATED: false,
    GETTING_NONCE: false,
    IS_LOGGED_IN: false,
    LOGGING_OUT: false,
    NETWORK_ERROR: false,
    SETTING_ACTIVE_CAT: false
  },
  lastStatusChange: EnumStatus.NONE
};

export const StatusContext = createContext<Context>(initialContext);

interface Props {
  children: any
}

export const StatusProvider = ({ children }: Props) => {
  const [ statuses, setStatuses ] = useState<any>(initialContext.statuses);
  const [ lastStatusChange, setLastStatusChange ] = useState<EnumStatus>(initialContext.lastStatusChange);

  const toggleStatus = (status: EnumStatus) => {
    if (isStatus(status)) {
      unSetStatus(status);
    } else {
      setStatus(status);
    }
  };

  const setStatus = (status: EnumStatus) => {
    let s = statuses;
    if (!isStatus(status)) {
      s[status] = true;
      setStatuses(s);
      setLastStatusChange(status);
    }
  };

  const unSetStatus = (status: EnumStatus) => {
    let s = statuses;
    if (isStatus(status)) {
      s[status] = false;
      setStatuses(s);
      setLastStatusChange(status);
    }
  };

  const setTemporaryStatus = (status: EnumStatus) => {
    let s = statuses;
    if (!isStatus(status)) {
      s[status] = true;
      setStatuses(s);
      setLastStatusChange(status);

      setTimeout(() => {
        s[status] = false;
        setStatuses(s);
        setLastStatusChange(status);
      }, 3000);
    }
  }

  const isStatus = (status: EnumStatus) => {
    return statuses[status] === true;
  };

  useEffect(() => {
    if (lastStatusChange) {
      setLastStatusChange(EnumStatus.NONE);
    }
  }, [lastStatusChange]); 

  return (
    <StatusContext.Provider value={{
      setStatus: setStatus,
      unSetStatus: unSetStatus,
      toggleStatus: toggleStatus,
      isStatus: isStatus,
      statuses: statuses,
      lastStatusChange: lastStatusChange,
      setTemporaryStatus: setTemporaryStatus
    }}>
      { children }
    </StatusContext.Provider>
  );
};

import axios from "axios";
import { 
  getApiUri, 
  PROD_URI, 
  DEV_URI, 
  isLivePath, 
  isDevPath
} from './';

interface Path {
  path: string,
  uri?: string,
  query?: any
}

export const API_ROUTES = {
  cats: 'cat',
  nonce: 'nonce',
  login: 'login',
  logout: 'logout',
  userprofile: 'auth/user-property/profile',
  userproperty: 'auth/user-property'
};

/**
 * Map out the request uri from a provided path string
 * or request object
 * 
 * @return {string}
 */
function getFullUri(path: string | Path) {
  let uri = getApiUri();
  let _path = path;
  let queryParams = '';

  if (typeof path !== 'string'
    && path.uri
  ) {
    uri = path.uri;
  }

  if (typeof path !== 'string'
    && path.query
    && Object.keys(path.query).length > 0
  ) {
    queryParams = '?' + Object.entries(
      path.query
    ).filter((obj: any) => {
      return obj[1];
    }).map((obj: any) => obj[0] + '=' + obj[1]).join('&');
  }

  if (typeof path !== 'string') {
    _path = path.path;
  }

  //if (isLivePath(_path.toString())) {
  //  uri = PROD_URI;
  //}
  
  //if (isDevPath(_path.toString())) {
  //  uri = DEV_URI;
  //}

  return `${uri}${_path}${queryParams}`;
}

enum Method {
  GET = 'get',
  UPDATE = 'update',
  DELETE = 'delete',
  CREATE = 'create',
  PATCH = 'patch'
};

export class Collection {
  data: any = [];
  loading: boolean = false;
  loaded: boolean = false;
  page: number = 1;
  limit: number = 48;
  max: number = 0;
  total: number = 0;
  previous: number = 0;
  next: number = 0;
  parameters: CollectionParams = {};

  constructor(colData?: CollectionData) {
    if (colData) {
      if (colData.data) {
        this.data = colData.data;
      } else if (Array.isArray(colData)) {
        this.data = colData;
      }
      if (colData.page) {
        this.page = colData.page;
      }
      if (colData.limit) {
        this.limit = colData.limit;
      }
      if (colData.max) {
        this.max = colData.max;
      }
      if (colData.total) {
        this.total = colData.total;
      }
      if (colData.previous) {
        this.previous = colData.previous;
      }
      if (colData.next) {
        this.next = colData.next;
      }
    }
  }

  isLoading() {
    return this.loading || !this.loaded;
  }

  isLoaded() {
    return !this.loading && this.loaded;
  }

  isEmpty() {
    return !this.isLoading() && this.data.length === 0;
  }

  getIndex(id: number) {
    let index;
    this.data.forEach((d: any, i: number) => {
      if (d.id === id) {
        index = i;
      }
    });

    return index;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setLoaded(loaded: boolean) {
    this.loaded = loaded;
  }

  setParameters(parameters: CollectionParams) {
    this.parameters = parameters;
  }

  setLimit(limit: number) {
    this.limit = limit;
  }

  setPage(page: number) {
    this.page = page;
  }

  getMaxPages() {
    if (this.total > this.limit) {
      return Math.ceil(this.total / this.limit);
    }

    return 1;
  }

  nextPage() {
    const max = this.getMaxPages();
    if (max > 1 && ((this.page + 1) <= max)) {
      return this.page + 1;
    }

    return null;
  }

  prevPage() {
    const max = this.getMaxPages();
    if (this.page > 1 && max > 1) {
      return this.page - 1;
    }

    return null;
  }

  first() {
    if (this.data[0]) {
      return this.data[0];
    }
  }

  last() {
    if (this.data[this.data.length - 1]) {
      return this.data[this.data.length - 1];
    }
  }

  map(fn: Function) {
    return this.data.map(fn);
  }

  filter(fn: Function) {
    return this.data.filter(fn);
  }
};

interface CollectionData {
  data?: any,
  page?: number,
  limit?: number,
  max?: number,
  total?: number
  previous?: number
  next?: number
};

export interface CollectionParams {
  page?: number
  limit?: number
  type?: any,
  category?: any,
  sortBy?: string,
  owner?: string,
  term?: string,
  face?: string,
  hats?: string,
  shirt?: string,
  unknowns?: string,
  founders?: string
};

export function request(
  method: Method,
  path: string | Path,
  parameters?: any,
  withCredentials?: boolean
) {
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  } as any;

  switch (method) {
    case Method.UPDATE:
      return axios.put(
        getFullUri(path), 
        parameters || {},
        {
          headers: headers,
          withCredentials: withCredentials || false
        }
      );
    case Method.CREATE:
      return axios.post(
        getFullUri(path), 
        parameters || {},
        {
          headers: headers,
          withCredentials: withCredentials || false
        }
      );
    case Method.DELETE:
      return axios.delete(
        getFullUri(path), {
          headers: headers,
          withCredentials: withCredentials || false
        }
      );
    case Method.PATCH:
      return axios.patch(
        getFullUri(path), 
        parameters || {}, {
          headers: headers
        }
      );
    default:
      return axios.get(
        getFullUri(path), {
          headers: headers,
          withCredentials: withCredentials || false
        }
      );
  }
};

export function _get(path: string | Path, parameters?: any) {
  return request(Method.GET, path, parameters);
};

export function _getAuth(path: string | Path, parameters?: any) {
  return request(Method.GET, path, parameters, true);
};

export function _create(path: string | Path, parameters?: any) {
  return request(Method.CREATE, path, parameters);
};

export function _createAuth(path: string | Path, parameters?: any) {
  return request(Method.CREATE, path, parameters, true);
};

export function _update(path: string | Path, parameters?: any) {
  return request(Method.UPDATE, path, parameters);
};

export function _updateAuth(path: string | Path, parameters?: any) {
  return request(Method.UPDATE, path, parameters, true);
};

export function _patchAuth(path: string | Path, parameters?: any) {
  return request(Method.PATCH, path, parameters);
};

export function _delete(path: string | Path) {
  return request(Method.DELETE, path);
};

export function _deleteAuth(path: string | Path) {
  return request(Method.DELETE, path, {}, true);
};

export function getCollection(path: string, parameters?: CollectionParams) {
  return _get({
    path: path,
    query: parameters
  });
};

export function getCat(id: number) {
  return _get(API_ROUTES.cats + '/' + id);
};

export function getCats(parameters?: CollectionParams) {
  return getCollection(API_ROUTES.cats, parameters);
};

export function getGallery(parameters?: CollectionParams) {
  return getCollection(API_ROUTES.cats, parameters);
};

export function getNonce() {
  return _get(API_ROUTES.nonce);
};

export function Auth_login(nonce: string, address: string, signature: string) {
  const params = new URLSearchParams();
  params.append('nonce', nonce);
  params.append('address', address);
  params.append('signature', signature);

  return _createAuth(
    API_ROUTES.login,
    params
  );
};

export function Auth_logout() {
  return _createAuth(
    API_ROUTES.logout
  );
};

export function Auth_getUser() {
  return _getAuth(
    API_ROUTES.userprofile
  );
};

export function Auth_updateUser(
  profile: any
) {
  const params = new URLSearchParams();
  params.append('profile', JSON.stringify(profile));

  return _patchAuth(
    API_ROUTES.userprofile,
    params
  );
};

export function Auth_createUserProfile(
  profile: any
) {
  const params = new URLSearchParams();
  params.append('profile', JSON.stringify(profile));

  return _createAuth(
    API_ROUTES.userproperty,
    params
  );
}
// The structure of our NFT metadata
export interface NFT {
  id: string,
  token_id: string,
  name: string,
  google_image?: string,
  ipfs_image?: string,
  thumbnail?: string,
  image?: string,
  points?: {
    hats: number,
    shirt: number,
    face: number,
    body: number,
  },
  attributes?: any
}

export interface ProviderChildren {
  children: any
};

export enum NftListType {
  CATS = 'cat',
  GALLERY = 'gallery'
};

export interface INftThumbnail {
  type: NftListType,
  nft: NFT,
  using_item?: boolean,
  onClick?: Function | boolean,
  selectedNft?: ISelectedNFT | boolean
};

export interface INftList {
  type: NftListType,
  emptyMessage?: string,
  using_item?: boolean,
  onClick?: Function,
  selectedNft?: ISelectedNFT | boolean,
  Filter?: Function
};

export interface INftThumbnailList {
  collection: any,
  emptyMessage?: string,
  onClick?: Function,
  selectedNft?: NFT
};

export interface ISelectedNFT {
  type: NftListType,
  nft: NFT
};

export interface IProfileContainerList {
  type: NftListType
};

export interface IAccordionLink {
  to: string,
  text: string,
  description?: string
};

export interface IEditableInput {
  editMode: boolean,
  name: string,
  label?: string,
  type?: string,
  value?: any,
  error?: boolean
}

export interface IUserData {
  username: string,
  bio?: string,
  twitter?: string,
  instgram?: string,
  facebook?: string,
  discord?: string,
  email?: string,
  profilepicturecatid?: number,
  profilepictureitemid?: number,
  profilepicturepetid?: number
};
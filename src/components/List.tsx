import React, {useContext, useEffect, useState} from 'react';
import { NFT, INftThumbnail, INftList, NftListType, INftThumbnailList } from '../types/interfaces';
import { UserContext } from '../context/UserContext';
import Container from './Container';

export function Thumbnail({ type, nft, using_item, onClick, selectedNft }: INftThumbnail) {
  const userContext = useContext(UserContext);
  let selected = false;

  if (selectedNft === undefined) {
    if (type === NftListType.CATS) {
      selected = (userContext.activeCat && userContext.activeCat.id === nft.id);
    }
  } else if (typeof selectedNft !== 'boolean') {
    selected = (selectedNft.type === type && nft.id === selectedNft.nft.id);
  }

  const _onClick = () => {
    if (typeof onClick === 'function') {
      return onClick(nft);
    }

    if (typeof onClick === 'boolean'
      && onClick === false
    ) {
      return null;
    }
    if (type === NftListType.CATS) {
      userContext.setActiveCat(nft);
    }
  }

  return (
    <NftThumbnail nft={ nft } selected={ selected } onClick={ _onClick } />
  );
}

export function NftThumbnail({ nft, selected, onClick }: { nft: NFT, selected: boolean, onClick?: Function }) {
  const _onClick = () => {
    if (typeof onClick === 'function') {
      onClick(nft);
    }
  };

  return (
    <Container 
      elementType='a' 
      className='cool-cat-thumbnail' 
      states={ [{ className: 'selected', condition: selected }] }
      onClick={ _onClick }
     >
      <img alt="" src={ nft.image || nft.ipfs_image } width="250" height="250" style={{ backgroundColor: '#ededed' }}/>
      <div className="shadow"></div>
    </Container>
  );
}

export function NftThumbnailList({ collection, emptyMessage, onClick, selectedNft }: INftThumbnailList) {
  return (
    <Container loading={ collection.isLoading() } className='list'>
      { collection.isEmpty() && <div className="center"><h3>{ emptyMessage || 'No results found' }</h3></div> }
      { collection.map((nft: NFT, index: number) => {
        let selected = false;
        if (selectedNft
          && selectedNft.id
        ) {
          selected = selectedNft.id === nft.id;
        }

        return (
          <NftThumbnail selected={ selected } nft={ nft } onClick={ onClick } key={ index } />
        );
      }) }
    </Container>
  );
}

export function ContainerList({ type, emptyMessage, onClick, selectedNft }: INftList) {
  const userContext = useContext(UserContext);
  const collection = userContext.getCollection(type);

  return (
    <Container loading={ collection.isLoading() } className='list'>
      { collection.isEmpty() && <div className="center"><h3>{ emptyMessage || 'No results found' }</h3></div> }
      { collection.map((nft: NFT, index: number) => <Thumbnail selectedNft={ selectedNft } type={ type } nft={ nft } onClick={ onClick } key={ index } />) }
    </Container>
  );
}

export default function List({ type, emptyMessage, onClick, Filter }: INftList) {
  const userContext = useContext(UserContext);
  const collection = userContext.getCollection(type);

  const getItems = () => {
    return collection.filter((nft: NFT) => {
      if (Filter) {
        return Filter(nft);
      }

      return true;
    }).map((nft: NFT, index: number) => {
      return (
        <Thumbnail type={ type } nft={ nft } onClick={ onClick } key={ index } />
      );
    });
  };

  return (
    <Container loading={ collection.isLoading() } emptyCondition={ !collection.isLoading() }>
      { collection.isEmpty() && <div className="center"><h3>{ emptyMessage || 'No results found' }</h3></div> }
      { getItems() }
    </Container>
  );
}
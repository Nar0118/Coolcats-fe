import React, { useContext } from 'react';
import { Block } from '../../../CatBlock';
import {UserContext} from "../../../../context/UserContext";
import { StatusContext, EnumStatus } from '../../../../context/Status';

export default function CatBlock() {
  const userContext = useContext(UserContext);
  const { isStatus } = useContext(StatusContext);

  if (!userContext.activeCat) {
    return null;
  }

  // Cat
  const nft = userContext.activeCat;

  let CatNft = nft;
  CatNft.image = `https://s3.amazonaws.com/api.coolcatsnft.com/thumbnails/${nft.id}_thumbnail.png`;
  CatNft.description = '#' + nft.id;

  return (
    <Block nft={ CatNft } header={ true } loading={ isStatus(EnumStatus.SETTING_ACTIVE_CAT) } />
  );
}

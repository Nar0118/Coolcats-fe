import { useContext } from 'react';
import { UserContext } from "../../../../context/UserContext";
import { NFT, NftListType } from "../../../../types/interfaces";
import List from "../../../List";

export default function Cats() {
  const { 
    activeCatTrait,
    defaultActiveCatTrait
  } = useContext(UserContext);

  const filterCatList = (cat: NFT) => {
    if (activeCatTrait === defaultActiveCatTrait) {
      return true;
    }
    return cat.attributes.filter((at: any) => at.trait_type === 'tier').pop().value === activeCatTrait;
  };

  return (
    <List type={ NftListType.CATS } emptyMessage={ `You don't own any cats yet!` } Filter={ filterCatList } />
  );
}
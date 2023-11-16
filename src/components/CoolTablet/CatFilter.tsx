import React, { useContext } from 'react';
import { UserContext } from "../../context/UserContext";

function CatFilter(props: any) {
  const {
    activeCatTrait,
    catTraits,
    setActiveCatTrait
  } = useContext(UserContext);

  if (catTraits.length <= 1) {
    return null;
  }

  return (
      <div className='tablet-screen-filter'>
        <ul>
          <li className={`${"" === activeCatTrait ? "active" : ""}`} title="Show All"><a className="all" onClick={ () => setActiveCatTrait('') }>All</a></li>
          { catTraits.map((t: any, i: number) => <li key={ i } className={`${t === activeCatTrait ? "active" : ""}`} title={ `Show ${t} cats`}><a className={t} onClick={ () => setActiveCatTrait(t) }></a></li>) }
        </ul>
      </div>
  );
}

export default CatFilter;

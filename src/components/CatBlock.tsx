import React from 'react';
import NftBlock from './NftBlock';
import Hat from '../static/images/icons/hat-icon.svg';
import Clothes from '../static/images/icons/shirt-icon.svg';
import Mood from '../static/images/icons/face-icon.svg';

export function StatBlock({ total, points }: { total: number, points: number }) {
  if (total === 2) {
    switch (points) {
      case 2:
        return (
          <>
            <span className="half active" />
            <span className="half active" />
          </>
        );
      default:
        return (
          <>
            <span className="half active" />
            <span className="half" />
          </>
        );
    }
  } else {
    switch (points) {
      case 2:
        return (
          <>
            <span className="active" />
            <span className="active" />
            <span />
            <span />
          </>
        );
      case 3:
        return (
          <>
            <span className="active" />
            <span className="active" />
            <span className="active" />
            <span />
          </>
        );
      case 4:
        return (
          <>
            <span className="active" />
            <span className="active" />
            <span className="active" />
            <span className="active" />
          </>
        );
      default:
        return (
          <>
            <span className="active" />
            <span />
            <span />
            <span />
          </>
        );
    }
  }
}

export function Block({ nft, header, loading }: { nft: any, header: boolean, loading?: boolean }) {
  // Default points to account for time delay on metadata server
  let hatPoints = 1;
  let clothesPoints = 1;
  let moodPoints = 1;

  if (nft.points) {
    let _points = nft.points;
    Object.keys(nft.points).forEach(_p => {
      _points[_p.toLowerCase()] = nft.points[_p];
    })

    // TODO: Fix mismatch between static api and mock at the moment.
    hatPoints = _points.hats;
    clothesPoints = _points.shirt;
    moodPoints = _points.face;
  }

  const points = hatPoints + clothesPoints + moodPoints;
  let pointsLabel = 'cool';

  // WILD
  if (points > 4 && points < 7) {
    pointsLabel = 'wild';
  }

  // CLASSY
  if (points > 6 && points < 9) {
    pointsLabel = 'classy';
  }

  // EXOTIC
  if (points > 8) {
    pointsLabel = 'exotic';
  }

  let CatNft = nft;
  CatNft.image = `https://s3.amazonaws.com/api.coolcatsnft.com/thumbnails/${nft.token_id}_thumbnail.png`;
  CatNft.description = '#' + nft.id;

  let link;
  if (!header) {
    link = `https://opensea.io/assets/0x1a92f7381b9f03921564a437210bb9396471050c/${nft.token_id}`;
  }

  return (
    <NftBlock nft={ CatNft } header={ header } link={ link } loading={ loading }>
      <div className="info">
        <div className="stats">
          { !header && <h3>
            # {nft.token_id}
          </h3> }
          <ul className="stat-table">
            <li key="hat" className="hat">
              <img alt="" src={Hat} />
              <StatBlock total={4} points={hatPoints} />
            </li>
            <li key="clothes" className="clothes">
              <img alt="" src={Clothes} />
              <StatBlock total={4} points={clothesPoints} />
            </li>
            <li key="mood" className="mood">
              <img alt="" src={Mood} />
              <StatBlock total={2} points={moodPoints} />
            </li>
          </ul>
        </div>
      </div>
      <div className={`rarity-badge rarity-badge--${points}`}>
        <h4>{pointsLabel}</h4>
        <span>{points}</span>
      </div>
    </NftBlock>
  );
}

const CatBlock = Block;

export default CatBlock;

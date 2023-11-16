import React, { ReactChild, ReactChildren } from 'react';
import Container from './Container';

interface Props {
  nft: any,
  header?: boolean,
  type?: string,
  link?: string,
  children?: ReactChild | ReactChildren | ReactChild[] | ReactChildren[],
  containerClass?: string,
  loading?: boolean
};

export interface NftProps {
  nft: any
};

export const NftBlock = ({ nft, header, type, children, link, containerClass, loading }: Props) => {
  const states = [];
  if (type) {
    states.push({ className: type + '-block' });
  }

  if (typeof header === 'undefined') {
    header = true;
  }

  return (
    <Container loading={ loading } className="cool-cat-block" states={ states } href={ link }>
      { header && <div className="cool-cat-block__header">
        <h3>
          { nft.name }
          <span>#{`${nft.token_id}`}</span>
        </h3>
      </div> }
      <img alt="" src={ nft.image } width="250" height="250" style={{ backgroundColor: '#ededed' }} />
      { containerClass && <div className={ containerClass }>
        { children }
      </div> }
      { !containerClass && children }
    </Container>
  );
}

export default NftBlock;
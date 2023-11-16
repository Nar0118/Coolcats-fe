import { useEffect, useContext } from 'react';
import Markdown from 'markdown-to-jsx';
import Page from '../Page';
import NotFoundPage from '../NotFoundPage';
import Container from '../../Container';
import { StatusContext, EnumStatus } from '../../../context/Status';
import { UserContext } from '../../../context/UserContext';
import CatBlock from '../../CatBlock';


export default function CoolCat(props: any) {
  const { isStatus } = useContext(StatusContext);
  const { getCat, currentCat, currentCatError } = useContext(UserContext);

  useEffect(() => {
    if (!currentCat || currentCat.token_id !== props.token_id) {
      getCat(props.token_id);
    }
  }, []);
  
  if (currentCatError) {
    return (
      <NotFoundPage />
    );
  }

  if (isStatus(EnumStatus.LOADING_CAT) || !currentCat) {
    return (
      <Page pageType='cat-showcase'>
        <Container loading={ true } />
      </Page>
    )
  }

  return (
    <Page pageType='cat-showcase'>
      <Container className='cat-showcase_container'>
        <CatBlock nft={ currentCat } header={ false } />
        <main>
          <h3>#{ currentCat.token_id }</h3>
          <p>{ currentCat.name }</p>
        </main>
      </Container>
    </Page>
  )
}

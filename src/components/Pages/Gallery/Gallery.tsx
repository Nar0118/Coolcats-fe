import { useContext, useEffect } from 'react';
import { UserContext } from "../../../context/UserContext";
import { FaceTraits, HatsTraits, ShirtTraits, TierTraits } from '../../../types/config';
import { NftListType } from '../../../types/interfaces'
import Container from '../../Container'
import CatBlock from '../../CatBlock';

const mapTraitsToOption = (traits: string[], emptyOption: string, replaceSpaces?: boolean) => {
  return [
    <option value='' key='-1'>{ emptyOption }</option>
  ].concat(
    traits.map((trait: string) => {
      return (
        <option key={ trait } value={ replaceSpaces ? trait.replaceAll('_', ' ') : trait }>{ trait.replaceAll('_', ' ') }</option>
      );
    })
  );
};

function SelectList({ label, traits, emptyOption, disabled }: { label: string, traits: string[], emptyOption: string, disabled: boolean }) {
  const { setCurrentSearch, currentSearch } = useContext(UserContext);
  const id = label.replaceAll(' ', '_').toLowerCase();

  const setSelectSearchValue = (e: any) => {
    if (e) {
      currentSearch['full_costumes'] = false;
      currentSearch['unknown_cats'] = false;
      currentSearch['founders_cats'] = false;
      currentSearch[e.target.name] = e.target.value;
      setCurrentSearch(currentSearch);
    }
  };
  
  return (
    <div className='form-element'>
      <label htmlFor={ id }>{ label }</label>
      <select id={ id } name={ id } disabled={ disabled } onChange={ setSelectSearchValue } value={ currentSearch[id] || '' }>
        { mapTraitsToOption(traits, emptyOption, id !== 'tier') }
      </select>
    </div>
  );
}

function Checkbox({ label, disabled }: { label: string, disabled: boolean }) {
  const { setCurrentSearch, currentSearch } = useContext(UserContext);
  const id = label.replaceAll(' ', '_').toLowerCase();

  const setCheckBoxSearchValue = (e: any) => {
    if (e) {
      currentSearch['face'] = '';
      currentSearch['hat'] = '';
      currentSearch['shirt'] = '';
      currentSearch['tier'] = '';
      currentSearch['full_costumes'] = false;
      currentSearch['unknown_cats'] = false;
      currentSearch['founders_cats'] = false;
      currentSearch[e.target.name] = e.target.checked;
      setCurrentSearch(currentSearch);
    }
  };

  return (
    <div className='form-element form-element--checkbox'>
      <label htmlFor={ id }>{ label }</label>
      <input id={ id } name={ id } disabled={ disabled } type='checkbox' onChange={ setCheckBoxSearchValue } checked={ currentSearch[id] === true } />
    </div>
  );
}

export function Page({ collection, page, fetcher, children }: { collection: any, page: number | null, fetcher: Function, children: any }) {
  const loading = collection.loading;
  const changePage = () => {
    fetcher({ page: page });
  }

  if (collection.total === 0 && (!page || page <= 1)) {
    return null;
  }

  return (
    <button className='button green small' disabled={ !page || loading } onClick={ changePage }>{ children }</button>
  );
}

export function PreviousPage({ collection }: { collection: any }) {
  const { fetchGallery } = useContext(UserContext);

  return (
    <Page collection={ collection } page={ collection.prevPage() } fetcher={ fetchGallery }>Previous</Page>
  );
};

export function NextPage({ collection }: { collection: any }) {
  const { fetchGallery } = useContext(UserContext);

  return (
    <Page collection={ collection } page={ collection.nextPage() } fetcher={ fetchGallery }>Next</Page>
  );
};

export function LastPage({ collection }: { collection: any }) {
  const { fetchGallery } = useContext(UserContext);
  const MaxPage = collection.getMaxPages();

  return (
    <Page collection={ collection } page={ (MaxPage === collection.page) ? null : MaxPage } fetcher={ fetchGallery }>Last</Page>
  );
};

export function FirstPage({ collection }: { collection: any }) {
  const { fetchGallery } = useContext(UserContext);
  const FirstPage = 1;

  return (
    <Page collection={ collection } page={ (FirstPage === collection.page) ? null : FirstPage } fetcher={ fetchGallery }>First</Page>
  );
};

export default function Gallery() {
  const { fetchGallery, getCollection, defaultGallerySort } = useContext(UserContext);
  const col = getCollection(NftListType.GALLERY);
  const loading = col.loading;

  useEffect(() => {
    if (!col.isLoaded()) {
      fetchGallery();
    }
  }, []);

  const submitForm = (e: any) => {
    if (e) {
      e.preventDefault();
    }

    const { 
      face,
      hat,
      shirt,
      tier,
      full_costumes,
      unknown_cats,
      founders_cats,
      sortby
    } = e.target.elements;

    let ids = [] as number[];
    if (full_costumes.checked) {
      ids = ids.concat([8344,8875,4102,3603,3410,1034,1789,2464,3815,4455,4595,2492,5889,5136,6941]);
    }
    if (unknown_cats.checked) {
      ids = ids.concat([1490,2288,3330,6972,8800,4695,9580,500,5280]);
    }
    if (founders_cats.checked) {
      ids = ids.concat([0,1,2,3]);
    }

    const values = {
      face: face.value,
      hats: hat.value,
      shirt: shirt.value,
      tier: tier.value,
      sortBy: sortby.value,
      ids: ids.join(','),
      page: 1
    };

    fetchGallery(values);
  }

  const getOutput = () => {
    if (col.total === 0) {
      return (
        <div className='no-results'>
          <p>Oops, looks like no Cats exist for that search, please alter your search and try again!</p>
        </div>
      );
    }

    return col.map((nft: any, i: number) => {
      return (
        <CatBlock nft={ nft } header={ false } key={ i } />
      );
    });
  };

  return (
    <section className="default-page default-page--gallery">
      <div className="inner-container">
        <div className="sidebar">
          <h1>GALLERY</h1>
          <Container elementType='form' className="form gallery-form" onSubmit={ submitForm } disabled={ loading }>
            <fieldset className='form-fieldset'>
              <legend>Search by trait</legend>
              <SelectList label='Face' traits={ FaceTraits } emptyOption='Face...' disabled={ loading } />
              <SelectList label='Hat' traits={ HatsTraits } emptyOption='Hat...' disabled={ loading } />
              <SelectList label='Shirt' traits={ ShirtTraits } emptyOption='Shirt...' disabled={ loading } />
              <SelectList label='Tier' traits={ TierTraits } emptyOption='Tier...' disabled={ loading } />
            </fieldset>
            <fieldset className='form-fieldset'>
              <legend>OR Search by collection</legend>
              <Checkbox label='Full Costumes' disabled={ loading } />
              <Checkbox label='Unknown Cats' disabled={ loading } />
              <Checkbox label='Founders Cats' disabled={ loading } />
            </fieldset>
            <fieldset className='form-fieldset'>
              <legend>Sort by</legend>
              <div className='form-element'>
                <select id='sortby' name='sortby' disabled={ loading } defaultValue={ defaultGallerySort }>
                  <option value='token_id_asc'>Lowest Token</option>
                  <option value='token_id_desc'>Highest Token</option>
                </select>
              </div>
            </fieldset>
            <div className="actions">
              <button type="submit" className='button small'>Get Cats</button>
            </div>
          </Container>
        </div>
        <div className="content">
          <Container className='gallery-container' loading={ loading }>
            { getOutput() }
          </Container>

          <div className='buttons'>
            <FirstPage collection={ col } />
            <PreviousPage collection={ col } />
            <NextPage collection={ col } />
            <LastPage collection={ col } />
          </div>
        </div>
      </div>
    </section>
  );
}

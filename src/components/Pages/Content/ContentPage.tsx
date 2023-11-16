import { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import NotFoundPage from '../NotFoundPage';
import Page from '../Page';
import RoadMap from '../../RoadMap';
import { IAccordionLink } from '../../../types/interfaces';
import { NavLink } from 'react-router-dom';
import menu from '../../../menu.json';
import { Link } from 'react-router-dom';

function SiteMenu({ filter }: { filter?: string }) {
  const links = menu.filter((item: IAccordionLink) => {
    if (filter) {
      return item.to.substring(0, filter.length) === filter;
    }

    return true;
  });
  
  if (links.length === 0) {
    return null;
  }

  const getLinks = () => {
    return links.map((link: IAccordionLink, i: number) => {
      return (
        <li key={ i }>
          <NavLink activeClassName='active' to={ link.to }>{ link.text }</NavLink>
          { link.description && <div>{ link.description }</div> }
        </li>
      );
    });
  }

  return (
    <ul>
      { getLinks() }
    </ul>
  );
}

function PrivacyPolicy() {
  return (
    <Link to='/privacy-policy'>Privacy Policy</Link>
  )
};

export default function ContentPage(props: any) {
  const [error, setError] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const setErrorFromResponse = (error: any) => {
    setError(error);
    setLoading(false);
  };

  const slug = props.match.url.substr(1);
  const post = menu.filter((item: IAccordionLink) => {
    return item.to.substring(1) === slug;
  }).pop();
  
  if (!post) {
    return (
      <NotFoundPage />
    );
  }

  const options = {
    overrides: {
      RoadMap,
      SiteMenu,
      PrivacyPolicy
    }
  } as any;

  let pageTypes = ['standard', 'content'];
  let innerTypes = [];
  const specials = ['roadmap'];
  if (specials.includes(slug)) {
    pageTypes.push(slug);
    innerTypes.push(slug);
  }

  return (
    <Page pageType={ pageTypes } innerTypes={ innerTypes }>
      <Markdown options={ options }>
        { post.content }
      </Markdown>
    </Page>
  )
}
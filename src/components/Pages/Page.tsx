import React from 'react';

export default function Page(props: any) {
  let cls = ['default-page'];
  let innerCls = ['inner-container'];
  if (typeof props.pageType === 'string'
    && props.pageType.length > 0
  ) {
    cls.push('default-page--' + props.pageType);
  } else if (Array.isArray(props.pageType)
    && props.pageType.length > 0
  ) {
    cls = cls.concat(props.pageType.map((t: string) => 'default-page--' + t));
  } else {
    cls.push('default-page--standard');
  }

  if (Array.isArray(props.innerTypes)) {
    innerCls = innerCls.concat(props.innerTypes);
  }

  return (
    <section className={ cls.join(' ') }>
      <div className={ innerCls.join(' ') }>
        { props.children }
      </div>
    </section>
  )
};
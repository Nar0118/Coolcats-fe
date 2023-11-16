import React from 'react';

interface GenericElementProps {
  children: React.ReactNode;
  className: string;
  elementType?: string;
}

export function Element({ children, className, elementType: ElementType = 'div', ...rest }: GenericElementProps): JSX.Element {
  return React.createElement(ElementType, Object.assign({ className: className }, rest), children);
}

export function Container(props: any) {
  let classNames = [];
  if (typeof props.className === 'string') {
    classNames.push(props.className);
  } else if (Array.isArray(props.classNames)) {
    classNames = props.classNames;
  }

  if (props.loading === true) {
    classNames.push('cool-cats-loading');
  }

  if (Array.isArray(props.states)) {
    props.states.filter((s: any) => {
      return typeof s === 'object';
    }).forEach((s: any) => {
      if (s.className) {
        const resolveClassName = (className: string | Function, condition: boolean) => {
          if (typeof className === 'function') {
            return className(condition);
          }

          if (condition === true) {
            return className;
          }

          return '';
        };

        if (typeof s.condition === 'boolean') {
          classNames.push(resolveClassName(s.className, s.condition));
        } else if (typeof s.condition === 'function') {
          classNames.push(resolveClassName(s.className, s.condition()));
        } else if (typeof s.condition === 'undefined') {
          classNames.push(s.className);
        }
      }
    });
  }

  const invalidKeys = [
    'elementType',
    'states',
    'classNames',
    'className',
    'emptyCondition',
    'loading'
  ];
  const rest = Object.fromEntries(
    Object.entries(
      props
    ).filter(
      ([key]) => {
        return !invalidKeys.includes(key)
      }
    )
  );

  let ElementType = 'div';
  if (typeof props.elementType === 'string') {
    ElementType = props.elementType;
  } else if (props.href) {
    ElementType = 'a';

    if (props.href.substr(0, 4) === 'http' || props.href.substr(0, 2) === '//') {
      rest.target = '_blank';
    }
  }

  if (props.emptyCondition) {
    return <>{ props.children }</>;
  }

  return (
    <Element elementType={ ElementType } className={ classNames.join(' ') } {...rest}>
      { props.children }
    </Element>
  );
}

export default Container;
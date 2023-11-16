import React, { useContext } from 'react';
import { StatusContext, EnumStatus } from '../context/Status';
import { SigningContext } from '../context/Signing';

interface Props {
  hideOnError?: boolean;
  children: React.ReactNode
}

export default function SigningOpen({ hideOnError, children }: Props) {
  const { isStatus } = useContext(StatusContext);
  const { error } = useContext(SigningContext);

  if (!isStatus(EnumStatus.SIGNING_OPEN)) {
    return null;
  }

  if (typeof hideOnError === 'boolean' 
    && hideOnError === true 
    && error
  ) {
    return null;
  }

  return (
    <>{ children }</>
  );
};
import React, { useContext } from 'react';
import { SigningContext } from '../context/Signing';

interface Props {
  children: React.ReactNode
}

export default function SigningError({ children }: Props) {
  const { error } = useContext(SigningContext);

  if (!error) {
    return null;
  }

  return (
    <>{ children }</>
  );
};
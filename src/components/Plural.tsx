import React from 'react';

interface Props {
  count: number,
  single: string,
  plural: string,
  zero?: string,
  loading?: string
};

export default function Plural({ count, single, plural, zero, loading }: Props) {
  if (loading) {
    return (
      <>{ loading }</>
    );
  }

  if (count <= 0 && zero && zero.length) {
    return (
      <>{ zero }</>
    );
  }

  if (count === 1) {
    return (
      <>{ single }</>
    );
  }

  return (
    <>{ plural }</>
  );
}
import React from 'react';

interface Props {
    points: number,
    total: number
}

export default function StatBlock({ total, points }: Props) {
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

import React, { useCallback } from 'react';

import { StarContainer } from './style';

interface Props {
  rating: number;
}

const Star: React.FC<Props> = ({ rating }) => {
  const MAX_STARS = Array(5).fill(null);
  
  const ratingStars = useCallback((_, index: number) => {
    const className = Math.floor(rating) - (index + 1) >= 0 ? 'sparkle' : '';
    return <span className={`star ${className}`} key={`star-${index}`} />;
  }, [rating])

  return (
    <StarContainer title={String(rating)}>
      {MAX_STARS.map(ratingStars)}
      <sup>({rating.toFixed(1)})</sup>
    </StarContainer>
  );
};

export default Star;

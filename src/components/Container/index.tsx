import React from 'react';
import Button from '../Button';
import Container from './style';

interface Props {
  title: string;
  backTo?: string;
}

const Section: React.FC<Props> = ({ title, backTo, children }) => {
  return (
    <Container>
      {backTo ? (
        <div className="header">
          <h2 className="title">{title}</h2>
          <Button.Back className="back-to" />
        </div>
      ) : (
        <h2 className="title">{title}</h2>
      )}
      {children}
    </Container>
  );
};

export default Section;

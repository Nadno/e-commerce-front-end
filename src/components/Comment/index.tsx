import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { Section, CommentForm } from './style';
import { Input } from '../Input';

import { apiPost } from '../../utils/api';
import Avatar from '../Avatar';
import useAccount from '../../hooks/useAccount';
import Select from '../Select';
import { Submit } from '../Form';

interface Props {
  productId: number;
}

const CreateComment: React.FC<Props> = ({ productId }) => {
  const { avatar, name, id: userId } = useAccount().account;
  const [data, setData] = useState({
    rating: '1',
    comment: '',
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value, name } = e.target;
      if (!(name in data)) return;

      setData(prev => ({
        ...prev,
        [name]: value,
      }));
    },
    [data]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const { comment, rating } = data;
      apiPost('/product/rate', {
        comment,
        rate: rating,
        user_id: userId,
        product_id: productId,
      });
    },
    [data]
  );

  return (
    <CommentForm onSubmit={handleSubmit}>
      <header>
        <div className="user">
          <Avatar src={avatar} />
          <span className="name">{name}</span>
        </div>

        <div className="rating">
          <Select
            id="rating"
            name="rating"
            value={data.rating}
            options={Array(5)
              .fill(0)
              .map((_, i) => ({ value: i + 1, abbr: i + 1 }))}
            label="Avaliar: "
            onChange={handleChange}
          />
        </div>
      </header>

      <div className="create-comment">
        <Input
          as="textarea"
          id="comment"
          name="comment"
          label="Comentário: "
          value={data.comment}
          onChange={handleChange}
        />
      </div>

      <Submit type="secondary">Enviar</Submit>
    </CommentForm>
  );
};

const CommentSection: React.FC<Props> = ({ productId }) => {
  return (
    <Section as="section">
      <CreateComment productId={productId} />
    </Section>
  );
};

export default CommentSection;

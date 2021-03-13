import React, {
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Section, CommentForm, CommentContainer } from './style';
import { Input } from '../Input';

import { apiGet, apiPost } from '../../utils/api';
import useAccount from '../../hooks/useAccount';
import Select from '../Select';
import { Submit } from '../Button';
import User from '../User';
import Star from '../Star';
import { FlexContainer } from '../Container/style';

interface Props {
  productId: number;
}

interface CreateComment extends Props {
  setComments: Dispatch<SetStateAction<any[]>>;
}

const CreateComment: React.FC<CreateComment> = ({ productId, setComments }) => {
  const initialData = () => ({ rating: '1', comment: '' });

  const { avatar, name, id: userId } = useAccount().account;
  const [data, setData] = useState(initialData);

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
      }).then(({ data }) => {
        setComments(prev => [data.comment, ...prev]);
        setData(initialData);
      });
    },
    [data]
  );

  return (
    <CommentForm onSubmit={handleSubmit}>
      <FlexContainer as="header">
        <User avatar={avatar} name={name} />

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
      </FlexContainer>

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

interface CommentProps {
  name: string;
  comment: string;
  user_id: number;
  rate: number;
  avatar: string;
}

const Comment: React.FC<CommentProps> = ({ name, rate, comment, avatar }) => {
  return (
    <CommentContainer>
      <FlexContainer as="header">
        <User avatar={avatar} name={name} />
        <Star rating={rate} />
      </FlexContainer>

      <div className="content">{comment}</div>
    </CommentContainer>
  );
};

const CommentSection: React.FC<Props> = ({ productId }) => {
  const [comments, setComments] = useState<any[]>([]);
  const { id } = useAccount().account;

  useEffect(() => {
    const { send, cancel } = apiGet(`/product/comments/${productId}`);

    send().then(({ data }) => {
      setComments(data.comments);
    });

    return cancel;
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <Section>
          <h2 className="title">Comentários</h2>

          {id != null && (
            <CreateComment productId={productId} setComments={setComments} />
          )}

          <hr />

          <ul>
            {comments.map(comment => (
              <Comment key={comment.id} {...comment} />
            ))}
          </ul>
        </Section>
      )}
    </>
  );
};

export default CommentSection;

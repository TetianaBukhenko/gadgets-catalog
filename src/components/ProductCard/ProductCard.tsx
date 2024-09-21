import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { ProductGeneral } from '../../types/ProductGeneral';
import { ShortInfo } from './components/ShortInfo';
import styles from './ProductCard.module.scss';
import { ProductContext } from '../../store/ProductContext';

export type Props = {
  product: ProductGeneral;
  displayFullPrice: boolean;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, displayFullPrice }) => {
    const navigate = useNavigate();
    const { darkTheme } = useContext(ProductContext);

    const id = product.itemId;
    const img = product.image;

    return (
      <article
        className={classNames(`${styles.container}`, {
          [styles.container__darkTheme]: darkTheme,
        })}
        onClick={() => {
          navigate(`/${product.category}/${id}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img
          className={`${styles.img} hover--scale`}
          src={img}
          alt={id}
          loading="lazy"
        />
        <div className={styles.mainInfo}>
          <ShortInfo productId={id} displayFullPrice={displayFullPrice} />
        </div>
      </article>
    );
  },
);

ProductCard.displayName = 'ProductCard';

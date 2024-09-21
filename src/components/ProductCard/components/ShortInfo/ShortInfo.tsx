import { useContext } from 'react';
import styles from './ShortInfo.module.scss';

import { ProductContext } from '../../../../store/ProductContext';
import { TechSpecs } from '../../../TechSpecs';
import { ProductButtons } from '../../../ProductButtons';
import { Price } from '../../../Price';

type Props = {
  productId: string;
  displayFullPrice: boolean;
};

export const ShortInfo: React.FC<Props> = ({ productId, displayFullPrice }) => {
  const { products } = useContext(ProductContext);

  const product = products.find(item => item.itemId === productId);

  if (!product) {
    return <div></div>;
  }

  return (
    <div className={`${styles.shortInfo}`}>
      <p className={`${styles.shortInfo__name}`}>{product.name}</p>
      <div className={`border--bottom ${styles.shortInfo__price}`}>
        <Price productId={productId} displayFullPrice={displayFullPrice} />
      </div>
      <TechSpecs
        techSpecs={{
          screen: product.screen,
          capacity: product.capacity,
          RAM: product.ram,
        }}
      />
      <div className={styles.buttons}>
        <ProductButtons productId={productId} />
      </div>
    </div>
  );
};

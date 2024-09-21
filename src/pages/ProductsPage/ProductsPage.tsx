import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import styles from './ProductsPage.module.scss';
import { Breadcrumb } from '../../components/Breadcrumb';
import { getFilteredItems } from '../../utils/getFilteredItems';
import { ProductGeneral } from '../../types/ProductGeneral';
import { ProductContext } from '../../store/ProductContext';
import { Dropdown } from './components/Dropdown';
import { Error } from '../../components/Error';
import { ErrorText } from '../../constants/errorText';
import { getCatagoryNameANDError } from '../../utils/utils';
import { Catalog } from '../../components/Catalog';

export const ProductsPage = () => {
  const [products, setProducts] = useState<ProductGeneral[]>([]);
  const { products: productsGeneral } = useContext(ProductContext);
  const [error, setError] = useState<ErrorText | ''>('');
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  const query = searchParams.get('query') || '';
  const { pathname } = useLocation();
  const category = pathname.slice(1);
  const { name, errorText } = getCatagoryNameANDError(category);
  const [showElement, setShowComponent] = useState('');

  useEffect(() => {
    try {
      const newProducts = productsGeneral.filter(
        product => product.category === category,
      );

      if (newProducts.length === 0) {
        setError(errorText);
      }

      setProducts(newProducts);
      setTimeout(() => {
        setShowComponent('show');
      }, 0);
    } catch (error1) {
      setError(ErrorText.default);
    }

    return () => {
      setShowComponent('');
    };
  }, [category, productsGeneral, errorText]);

  const filteredProducts = useMemo(() => {
    return getFilteredItems(products, sortBy, query);
  }, [products, sortBy, query]);

  return (
    <section className={`${styles.container} `}>
      {error ? (
        <Error errorText={error} />
      ) : (
        <>
          <div className={styles.location}>
            <Breadcrumb />
          </div>
          <div className={styles.title}>
            <h1 style={{ display: 'none' }}>{name} page</h1>
            <p className={`text--page-title hidden-left ${showElement}`}>
              {name}
            </p>
            <p className={`text--grey ${styles.title__text}`}>
              {`${products.length} models`}
            </p>
          </div>

          <Dropdown />

          {filteredProducts.length === 0 && query ? (
            <div className={styles.error}>
              <Error errorText={`There are no products matching the query!`} />
            </div>
          ) : (
            <div className={`${styles.catalog} hidden-bottom ${showElement}`}>
              <Catalog products={filteredProducts} />
            </div>
          )}
        </>
      )}
    </section>
  );
};

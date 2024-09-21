import styles from './HomePage.module.scss';
import { useElementOnScreen } from '../../hooks/useElementOnScreen';
import { Categories } from './components/Categories';
import { NewProducts } from './components/NewProducts';
import { HotPrices } from './components/HotPrices';
import { BannerSlider } from './components/BannerSlider';

export const HomePage = () => {
  const { containerRef, isVisible } = useElementOnScreen();

  return (
    <section className={styles.container}>
      <h1 className={styles.title__hidden}>Product Catalog</h1>
      <h2
        ref={containerRef}
        className={`${styles.title} text--page-title hidden-left ${isVisible && 'show'}`}
      >
        Welcome to Nice Gadgets store!
      </h2>
      <BannerSlider />

      <NewProducts />
      <Categories />
      <HotPrices />
    </section>
  );
};

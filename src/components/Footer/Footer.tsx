import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames';

import styles from './Footer.module.scss';
import { ProductContext } from '../../store/ProductContext';
import { useScrollExists } from '../../hooks/useHeight';
import { getButtonClass } from '../../utils/getButtonClass';

export const Footer = () => {
  const { darkTheme } = useContext(ProductContext);
  const displayButton = useScrollExists();
  const buttonClass = `${styles.buttonBack__arrow} button--small ${getButtonClass.secondary(darkTheme)}`;
  const getLinkClass = classNames(`${styles.link} link--underline`, {
    [styles.link__darkTheme]: darkTheme,
  });
  const getLogoLink = darkTheme ? 'img/logo--white.png' : 'img/logo--dark.png';
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={classNames(`${styles.container}`, {
        darkTheme: darkTheme,
      })}
    >
      <Link to="/" className={styles.logo}>
        <img src={getLogoLink} alt="logo" className={styles.logo_img} />
      </Link>
      <ul className={styles.nav}>
        <li>
          <Link
            target="_blank"
            to="https://github.com/TetianaBukhenko"
            className={getLinkClass}
          >
            GITHUB
          </Link>
        </li>
        <li>
          <Link
            to={'mailto:tetiana.bukhenko@gmail.com'}
            className={getLinkClass}
          >
            CONTACTS
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.linkedin.com/in/tanya-bukhenko-9898871a5/"
            className={getLinkClass}
          >
            LINKEDIN
          </Link>
        </li>
      </ul>

      <div
        className={classNames(`${styles.buttonBack}`, {
          [styles.buttonBack__hide]: !displayButton,
        })}
        onClick={handleButtonClick}
      >
        <p className={`${styles.link} link--underline`}>Back to top</p>
        <Link to="#">
          <button className={buttonClass}>
            <div className=" icon icon--arrow"></div>
          </button>
        </Link>
      </div>
    </div>
  );
};

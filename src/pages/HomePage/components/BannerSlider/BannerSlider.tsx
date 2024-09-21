import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import styles from './BannerSlider.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useWidth } from '../../../../hooks/useWidth';
import { MobileSwiper } from '../../../../components/MobileSwiper/MobileSwiper';

import { ProductContext } from '../../../../store/ProductContext';
import { getButtonClass } from '../../../../utils/getButtonClass';
import { Loader } from '../../../../components/Loader';
import { BottomButtons } from './components/BottomButtons';
import { bannerBig, bannerSmall } from './components/BannerImages';

export const BannerSlider = () => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const { darkTheme } = useContext(ProductContext);
  const [showImg, setShowImg] = useState(false);

  const width = useWidth();
  const buttonClass = `${styles.slider__button}  ${width >= 640 && getButtonClass.secondary(darkTheme)}`;
  const displayedImg = useMemo(() => {
    if (width < 640) {
      return bannerSmall;
    } else {
      return bannerBig;
    }
  }, [width]);
  const timerId = useRef(0);
  const navigate = useNavigate();

  //#region handle increase and decrease
  const handleIncrease = () => {
    setDisplayIndex(prevIndex => {
      if (prevIndex + 1 >= displayedImg.length) {
        return 0;
      }

      return prevIndex + 1;
    });
    window.clearInterval(timerId.current);
  };

  const handleDecrease = () => {
    setDisplayIndex(prevIndex => {
      if (prevIndex - 1 < 0) {
        return displayedImg.length - 1;
      }

      return prevIndex - 1;
    });
    window.clearInterval(timerId.current);
  };
  //#endregion

  useEffect(() => {
    window.clearInterval(timerId.current);
    if (showImg) {
      timerId.current = window.setInterval(() => {
        setDisplayIndex(prevIndex => {
          if (prevIndex + 1 >= displayedImg.length) {
            return 0;
          }

          return prevIndex + 1;
        });
      }, 5000);
    }

    return () => {
      window.clearInterval(timerId.current);
    };
  }, [displayedImg, showImg]);

  const onSwipe = (diff: number) => {
    if (diff > 0) {
      handleDecrease();
    } else {
      handleIncrease();
    }
  };

  return (
    <div className={styles.slider}>
      {!showImg && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      <div
        className={`${styles.slider__middle} hidden ${showImg ? 'show' : ''}`}
        style={{ visibility: `${!showImg ? 'hidden' : 'visible'}` }}
      >
        <button className={buttonClass} onClick={handleDecrease}>
          <div className=" icon icon--arrow"></div>
        </button>
        <div className={styles.slider__container}>
          <div className={styles.slider__wrapper}>
            {displayedImg.map(banner1 => (
              <div
                className={`${styles.slider__img} `}
                key={banner1.img}
                onClick={() => {
                  navigate(`/${banner1.id}`);
                  window.scroll(0, 0);
                }}
                style={
                  {
                    transition: displayIndex === 0 ? '' : 'transform 3s',
                    transform: `translateX(calc((-100% * ${displayIndex}) - 16px  * ${displayIndex})`,
                  } as React.CSSProperties
                }
              >
                <MobileSwiper onSwipe={onSwipe}>
                  <img
                    className={`${styles.slider__img} ${styles.slider__img_link}`}
                    src={banner1.img}
                    alt={banner1.name}
                    loading="lazy"
                    onClick={() => {
                      navigate(`/${banner1.id}`);
                      window.scroll(0, 0);
                    }}
                    onLoad={() => {
                      setShowImg(true);
                    }}
                  />
                </MobileSwiper>

                <Link
                  to={`/${banner1.id}`}
                  onClick={() => window.scroll(0, 0)}
                  className={`${styles.slider__button_small} link hover--scale`}
                >
                  ORDER NOW
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button className={buttonClass} onClick={handleIncrease}>
          <div className="icon icon--arrow"></div>
        </button>
      </div>
      {showImg && (
        <BottomButtons
          imgLength={displayedImg.length}
          displayIndex={displayIndex}
          updateDispayIndex={n => {
            setDisplayIndex(n);
          }}
          timerId={timerId}
        />
      )}
    </div>
  );
};

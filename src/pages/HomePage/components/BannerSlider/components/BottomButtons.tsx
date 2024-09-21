import classNames from 'classnames';

import styles from '../BannerSlider.module.scss';

type Props = {
  imgLength: number;
  displayIndex: number;
  updateDispayIndex: (n: number) => void;
  timerId: { current: number };
};

export const BottomButtons: React.FC<Props> = ({
  imgLength,
  displayIndex,
  updateDispayIndex,
  timerId,
}) => {
  return (
    <div className={styles.slider__bottom}>
      {new Array(imgLength).map((_el, index) => {
        return (
          <div
            key={index}
            className={classNames(`${styles.rectangular} `, {
              [styles.rectangular__selected]: index === displayIndex,
            })}
            onClick={() => {
              updateDispayIndex(index);
              window.clearInterval(timerId.current);
            }}
          ></div>
        );
      })}
    </div>
  );
};

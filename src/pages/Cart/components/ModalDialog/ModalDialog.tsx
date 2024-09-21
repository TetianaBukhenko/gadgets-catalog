import { useContext, useEffect, useState } from 'react';

import styles from './ModalDialog.module.scss';
import { ProductContext } from '../../../../store/ProductContext';
import { getButtonClass } from '../../../../utils/getButtonClass';

export type Props = {
  onDelete: () => void;
  displayModal: (v: boolean) => void;
};

export const ModalDialog: React.FC<Props> = ({ onDelete, displayModal }) => {
  const { darkTheme } = useContext(ProductContext);
  const [showElement, setShowComponent] = useState('');

  useEffect(() => {
    setShowComponent('show-modal');
  }, []);

  const handleDelete = () => {
    onDelete();
    setShowComponent('');
    setTimeout(() => {
      displayModal(false);
    }, 500);
  };

  return (
    <div className={`${styles.modalDialog} `}>
      <div
        className={`${styles.modalDialog__container} hidden-modal ${showElement}`}
      >
        <div
          className={styles.modalDialog__close}
          onClick={() => {
            setShowComponent('');
            setTimeout(() => {
              displayModal(false);
            }, 500);
          }}
        >
          <div className="icon icon--close"></div>
        </div>
        <p>
          Checkout is not implemented yet. <br />
          Do you want to clear the Cart?
        </p>
        <div
          className={`${styles.modalDialog__confirm} ${getButtonClass.main(darkTheme)}`}
          onClick={handleDelete}
        >
          Yes
        </div>
      </div>
    </div>
  );
};

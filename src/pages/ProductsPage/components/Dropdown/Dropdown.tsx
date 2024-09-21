import { useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Dropdown.module.scss';
import { ProductContext } from '../../../../store/ProductContext';
import classNames from 'classnames';

export enum SortBy {
  newest = 'Newest',
  name = 'Alphabetically',
  cheapest = 'Cheapest',
}

const itemsPerPageOptions = ['8', '16', '24', 'All'];

type Props = {
  options: string[];
  title: string;
  name: string;
  selectedDropdown: string;
  setSelectedDropdown: (v: string) => void;
};

const DropdownItem: React.FC<Props> = ({
  options,
  title,
  name,
  selectedDropdown,
  setSelectedDropdown,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startValue = name === 'sortBy' ? SortBy.newest : 'All';
  const value = searchParams.get(name) || startValue;
  const displayed = useMemo(() => {
    return selectedDropdown === name;
  }, [selectedDropdown, name]);
  const { darkTheme } = useContext(ProductContext);
  const dropdownClassName = classNames(`${styles.dropdown__value} border`, {
    [styles.dropdown__value__active]: displayed,
    [styles.dropdown__value__darkTheme]: darkTheme,
    [styles.dropdown__value__darkTheme__active]: darkTheme && displayed,
  });

  function handleOptionClick(newValue: string) {
    setSelectedDropdown('');
    const params = new URLSearchParams(searchParams);

    params.set(name, newValue);
    params.delete('page');
    setSearchParams(params);
  }

  return (
    <div className={styles.item}>
      <p className="text--grey text--small">{title}</p>
      <div className={styles.dropdown}>
        <div
          onClick={() => setSelectedDropdown(name)}
          className={dropdownClassName}
        >
          <p>{value}</p>

          <div
            className={classNames(`icon icon--arrow ${styles.dropdown__icon}`, {
              [styles.dropdown__icon__darkTheme]: darkTheme,
            })}
            style={{
              transform: displayed ? 'rotate(270deg)' : '',
            }}
          ></div>
        </div>
        {displayed && (
          <ul
            className={`${styles.dropdown__container} border`}
            tabIndex={0}
            onMouseLeave={() => setSelectedDropdown('')}
          >
            {options.map(item => (
              <li
                className={classNames(`${styles.dropdown__item} text--grey`, {
                  [styles.dropdown__item__darkTheme]: darkTheme,
                })}
                key={item}
                onClick={() => handleOptionClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const Dropdown = () => {
  const [selectedDropdown, setDropdown] = useState('');

  return (
    <div className={styles.container}>
      <DropdownItem
        options={Object.values(SortBy)}
        title="Sort by"
        name="sortBy"
        selectedDropdown={selectedDropdown}
        setSelectedDropdown={(newValue: string) => {
          setDropdown(prev => (prev === newValue ? '' : newValue));
        }}
      />
      <DropdownItem
        options={itemsPerPageOptions}
        title="Items per page"
        name="itemsPerPage"
        selectedDropdown={selectedDropdown}
        setSelectedDropdown={(newValue: string) => {
          setDropdown(prev => (prev === newValue ? '' : newValue));
        }}
      />
    </div>
  );
};

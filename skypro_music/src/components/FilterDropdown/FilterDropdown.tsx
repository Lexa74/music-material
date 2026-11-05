import styles from '../CenterBlock/CenterBlock.module.css';

export type FilterName = 'Исполнителю' | 'году выпуска' | 'жанру';
type FilterDropdownProps = { title: FilterName; options: string[] };

export default function FilterDropdown({ title, options }: FilterDropdownProps) {
  return (
    <div className={styles.filter__popup}>
      <ul className={styles.filter__list} aria-label={`Фильтр: ${title}`}>
        {options.map((option) => <li className={styles.filter__option} key={option}>{option}</li>)}
      </ul>
    </div>
  );
}

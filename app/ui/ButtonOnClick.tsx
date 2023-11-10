import styles from './ColorBackground.module.css';

type Props = { 
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    label: string;
  };

const ButtonOnClick = ({ onClick, label }: Props) => <button className={styles.button} onClick={onClick}>{label}</button>

export default ButtonOnClick;
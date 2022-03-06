import {FC} from "react";
import styles from './styles.module.scss';

const Header: FC = (props) => {
  return (
    <header className={styles.header}>
      {props.children}
    </header>
  )
}

export default Header;

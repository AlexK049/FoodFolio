import styles from '../static/css/header.module.css';
import pretzelImage from '../static/images/pretzel.png';
import hamburgerMenu from '../static/images/hamburger-menu.png';

const Header = ({ menuClick }) => {
    return (
        <header>
            <div className={styles.header}>
                <img src={pretzelImage} className={styles.logoImg} />
                <h1 className={styles.appTitle}>Food Folio</h1>
                <button className={styles.hamburgerMenu} onClick={menuClick}>
                    <img src={hamburgerMenu} />
                </button>
            </div>
            <div className={styles.headerSeparator}></div>
        </header>
    );
};

export default Header;

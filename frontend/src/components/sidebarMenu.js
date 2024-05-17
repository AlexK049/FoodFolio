import Drawer from "./drawer"
import styles from '../static/css/sidebar-menu.module.css'
import homeImage from "../static/images/home.png"
import notesImage from "../static/images/notes.png"
import { Link } from 'react-router-dom';
import api from '../static/js/APIClient';

const SidebarMenu = ({ isOpen, close }) => {
    const logout = async () => {
        api.logout();
        window.location.href = '/login';
    }
    const MenuItem = ({ name, route, iconSrc }) => (
        <Link to={route} className={styles.menuItem} onClick={close}>
            <img className={styles.menuItemImg} src={iconSrc} />
            <h2 className={styles.menuItemName}>{name}</h2>
        </Link>
    );
    return (
        <Drawer className={styles.sidebar} isOpen={isOpen} close={close}>
            <button className={styles.closeButton} onClick={close}><div>x</div></button>
            <h2 className={styles.menuTitle}>Menu</h2>
            <MenuItem name="Home" route="/" iconSrc={homeImage} />
            <MenuItem name="My Notes" route="/notes" iconSrc={notesImage} />
            <button className={styles.logout} onClick={logout}>Logout  </button>
        </Drawer>
    );
}

export default SidebarMenu;

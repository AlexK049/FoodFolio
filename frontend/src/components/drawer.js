import styles from '../static/css/drawer.module.css';

const Drawer = ({ isOpen, close, children }) => {
    return (
        <div className={`${styles.drawerOverlay} ${isOpen ? styles.open : ''}`} onClick={close}>
            <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Drawer;

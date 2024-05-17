import styles from '../static/css/modal.module.css';

const Modal = ({ isOpen, close, children }) => {
    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={close}>
            <div className={`bg-light ${styles.modalPane} ${isOpen ? styles.open : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;

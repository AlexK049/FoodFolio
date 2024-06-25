import styles from '../static/css/modal.module.css';
import CloseButton from './closeButton';
import { useState, useEffect } from 'react';

const Modal = ({ isOpen, close, children, title, closeOnClickOutside }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    /* this is done because otherwise the close animation occurs on every refresh. look at css file */
    const [closeTriggered, setCloseTriggered] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const modalOverlayClick = () => {
        if (closeOnClickOutside || isMobile) {
            close();
            setCloseTriggered(true);
        }
    };

    return (
        <div>
            <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ""}`} onClick={modalOverlayClick}>
            </div>
            <div className={`bg-light ${styles.modalPane} ${isOpen ? styles.open : closeTriggered ? styles.close : ""}`} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-2 pl-4 pt-4">{title}</h1>
                    <div className={styles.closeBtn}>
                        <CloseButton onClick={close} />
                    </div>
                </div>
                <div className="pb-4 pl-4 pr-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

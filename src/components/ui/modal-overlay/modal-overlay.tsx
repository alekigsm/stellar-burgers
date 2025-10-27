import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div
    data-testid='Order number'
    className={styles.overlay}
    onClick={onClick}
  />
);

import { useEffect, useRef, useCallback } from "react";
import { bodyFixPosition, bodyUnfixPosition } from "../lib/scroll";

import styles from "./Modal.module.scss";

const Modal = (props) => {
  const { children, open, close } = props;

  const modalRef = useRef(null);

  const onEscapeKeyDownHandler = useCallback(
    (e) => e.key === "Escape" && close(),
    [close]
  );

  const handleOutsideClick = useCallback(
    (event) => {
      const path = event.path || (event.composedPath && event.composedPath());
      if (!path.includes(modalRef.current)) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    document.body.addEventListener("keydown", onEscapeKeyDownHandler);
    return () => {
      document.body.removeEventListener("keydown", onEscapeKeyDownHandler);
    };
  }, [onEscapeKeyDownHandler]);

  useEffect(() => {
    setTimeout(() => {
      bodyFixPosition();
      open();
    }, 0);
    return () => {
      bodyUnfixPosition();
    };
  }, [open]);

  return (
    <div className={styles.overlay} >
      <div ref={modalRef} className={styles.modal}>
        <div onClick={close} className={styles.btnCansel} />
        {children}
      </div>
    </div>
  );
};

export default Modal;

import React, { useRef, useEffect, useState } from "react";
import prof from "../images/profile.png";
import Form from "../SenderForm/Form";
import Modal from "../ModalWindow/Modal";

import styles from "./CardItem.module.scss";

const CardItem = ({ item }) => {
  const description = useRef("");
  const address = useRef("");
  const company = useRef("");
  const [isShowMore, setShowMore] = useState(false);
  const [isShowForm, setShowForm] = useState(false);

  const openInfoModal = () => setShowMore(true);
  const closeInfoModal = () => setShowMore(false);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  useEffect(() => {
    description.current.innerHTML = item.description;
    address.current.innerHTML = item.address;
    company.current.innerHTML = item.company;
  });

  const respond = () => {
    closeInfoModal();
    openForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={prof} alt="profile" className={styles.imgBlock} />
        <div className={styles.name}>
          <strong>Должность:</strong> {item?.jobName}
        </div>
        <div className={styles.price}>
          <strong>Заработная плата:</strong>{" "}
          {`${item?.salary} ${item?.currency}`}
        </div>
        <button className={styles.showMoreBtn} onClick={openInfoModal}>
          Подробнее
        </button>
      </div>

      {isShowForm && (
        <Modal open={openForm} close={closeForm}>
          <Form />
        </Modal>
      )}

      <div className={isShowMore ? styles.activeModal : styles.overlay}>
        <div className={styles.modal}>
          <div onClick={closeInfoModal} className={styles.btnCansel} />
          <div className={styles.contentModal}>
            <p className={styles.jobName}>{item?.jobName}</p>
            <p className={styles.industry}>{`Отрасль: ${item?.industry}`} </p>
            <p
              className={styles.jobPrice}
            >{`Заработная плата: ${item?.salary} ${item?.currency}`}</p>
            <p className={styles.chart}>{`График: ${item?.schedule}`}</p>
            <p className={styles.link}>
              Ссылка на вакансию:{" "}
              <a href={item?.url} target="blank">
                {item?.url}
              </a>
            </p>
            <div ref={company} />
            <div ref={description} />
            <div ref={address}></div>
            <button onClick={respond} className={styles.respondBtn}>
              {" "}
              Откликнуться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardItem;

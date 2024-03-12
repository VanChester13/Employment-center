import React, { useState } from "react";
import InputMask from 'react-input-mask';

import styles from './Form.module.scss'

const Form = ({ setVisiableForm }) => {
  const initData = { FIO: "", email: "", phone: "" }
  const [state, setState] = useState(initData);

  const handleSubmit = (mail) => {
    if (!mail.match(/.+@.+/)) {
      return alert("Адрес электронной почты не верный!");
    } else {
      setVisiableForm(false);
    }
  };

  const enterValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const clear = (e) => {
    e.preventDefault();
    setState(initData);
  };

  return (
    <div className={styles.wrapper}>
      <form action="https://formsubmit.co/PimenovVY@social.mos.ru " method="POST"
        className={styles.container}
        onSubmit={() => handleSubmit(state.email)}
      >
        <label>
          {" "}
          ФИО:{" "}
          <input
            type="text"
            value={state.FIO}
            name="FIO"
            required
            placeholder="Ражев Иван Юрьевич"
            onChange={enterValue}
          />
        </label>
        <label>
          {" "}
          Email:{" "}
          <input
            type="text"
            value={state.email}
            name="email"
            required
            placeholder="some@some.some"
            onChange={enterValue}
          />
        </label>
        <label>
          {" "}
          Номер телефона:{" "}
          <InputMask
            type="text"
            value={state.phone}
            name="phone"
            mask='+7 (999) 999-99-99'
            placeholder="+7 (999) 999-99-99"
            onChange={enterValue}
          />
        </label>
        <button className={styles.btn} type="button" onClick={(e) => clear(e)}>
          Очистить
        </button>
        <button disabled={!state.FIO || !state.email} className={styles.btn} type="submit">Отправить</button>
      </form>
    </div>
  );
};
export default Form;

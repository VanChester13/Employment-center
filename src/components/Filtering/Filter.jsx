import React, { useState } from "react";
import styles from "./Filter.module.scss";

export const Filter = ({ findNeedVacancy, resetData }) => {
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState('');
  const [withoutSalary, setWithoutSalary] = useState(false);
  
  const findVacansy = () => {
    const obj = { position, salary, withoutSalary };
    const nullObj = { position: '', salary: '', withoutSalary: false};
    const doSearch = JSON.stringify(obj) !== JSON.stringify(nullObj);
    findNeedVacancy(obj, doSearch)
  };

  const reset = () => {
    resetData();
    setPosition('');
    setSalary('');
    setWithoutSalary(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.position}>
        <p> Название вакансии: </p>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className={styles.salary}>
        <p> Размер зарплаты: </p>
        <input
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <div className={styles.withoutSalary}>
        <span>Не показывать вакансии без зарплаты: </span>
        <input
          type="checkbox"
          defaultChecked={false}
          onChange={(e) => setWithoutSalary(e.target.checked)}
          className={styles.input}
        />
      </div>
      <button className={styles.btn} onClick={findVacansy}>
        Поиск
      </button>
      <button className={styles.btn} onClick={reset}>
        Сбросить
      </button>
    </div>
  );
};
export default Filter;

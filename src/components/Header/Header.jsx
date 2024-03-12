import React from "react";
import styles from './Header.module.scss'
import Filter from "../Filtering/Filter";

const Header = ({ findNeedVacancy, resetData }) => {
    return (
      <div className={styles.wrapper}>
        <Filter findNeedVacancy={findNeedVacancy} resetData={resetData}/>
      </div>
    )
}
export default Header;
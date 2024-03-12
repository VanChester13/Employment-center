import React from "react";
import img1 from "../images/projects/img1.png";
import img2 from "../images/projects/img2.png";
import img3 from "../images/projects/img3.png";
import img4 from "../images/projects/img4.png";
import img5 from "../images/projects/img5.png";
import img6 from "../images/projects/img6.png";
import img7 from "../images/projects/img7.png";
import styles from "./Projects.module.scss";

const arrayImg = [img1, img2, img3, img4, img5, img6, img7];

const Projects = () => {
  return (
    <div className={styles.projects}>
      {arrayImg.map((item, index) => (
        <div key={index} className={styles.imgBlock}>
          <img src={item} alt={index} />
        </div>
      ))}
    </div>
  );
};
export default Projects;

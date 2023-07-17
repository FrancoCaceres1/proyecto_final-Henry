import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ id, name, image, continent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseMove = (e) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const newRotateX = (mouseY - cardCenterY) / 15;
    const newRotateY = (mouseX - cardCenterX) / 15;

    setRotateX(newRotateX);
    setRotateY(newRotateY);
  };

  return (
    <Link to={`/detail/${id}`}>
      <div
        className={`${styles.container} ${isHovered ? styles.hovered : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ "--rotate-x": `${rotateX}deg`, "--rotate-y": `${rotateY}deg` }}
      >
        <div className={styles.card}>
          <div className={styles.imgContainer}>
            <img src={image} alt={name} className={styles.img} />
          </div>
          <div className={styles.dataContainer}>
            <h2 className={styles.title}>{name}</h2>
            <span className={styles.linea}></span>
            <div className={styles.nameContinent}>
              <img src="/img/place.png" alt="" />
              <h3>{continent}</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

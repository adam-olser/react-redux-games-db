//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
//React Router
import { Link, useHistory } from "react-router-dom";
import { smallImage } from "../util";
import { popup } from "../animations";
import imageNotFound from "../img/no_image.png";

const Game = ({ game: { name, released, background_image, id } }) => {
  const stringPathId = id.toString();
  //Scrolling
  const history = useHistory();
  if (history.location.pathname === "/") {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
  }

  //Load detail
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(id));
  };
  return (
    <StyledGame
      layoutId={stringPathId}
      onClick={loadDetailHandler}
      variants={popup}
      initial="hidden"
      animate="show"
    >
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>Release Date: {released}</p>
        {background_image === null ? (
          <motion.img src={imageNotFound} title="Image not available" />
        ) : (
          <motion.img
            layoutId={`image ${stringPathId}`}
            src={smallImage(background_image, 640)}
            alt={name}
            loading="lazy"
          />
        )}
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

export default Game;

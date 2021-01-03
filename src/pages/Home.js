import { useEffect } from "react";
import { loadGames } from "../actions/gamesAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Game from "../components/Game";
//Styling and animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import GameDetail from "../components/GameDetail";
import { fadeIn } from "../animations";

const Home = () => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  //Fetch games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );
  return (
    <AnimateSharedLayout type={"crossfade"}>
      <GameList variants={fadeIn} initial="hidden" animate="show">
        <AnimatePresence>
          {pathId && <GameDetail pathId={pathId} />}
        </AnimatePresence>
        {searched.length ? (
          <div className="searched">
            <h2>Searched Games</h2>
            <Games>
              {searched &&
                searched.map((game) => (
                  <Game game={game} key={game.id} id={game.id} />
                ))}
            </Games>
          </div>
        ) : (
          ""
        )}

        <h2>Upcoming Games</h2>
        <Games>
          {upcoming &&
            upcoming.map((game) => (
              <Game game={game} key={game.id} id={game.id} />
            ))}
        </Games>
        <h2>Popular Games</h2>
        <Games>
          {popular &&
            popular.map((game) => (
              <Game game={game} key={game.id} id={game.id} />
            ))}
        </Games>
        <h2>New Games</h2>
        <Games>
          {newGames &&
            newGames.map((game) => (
              <Game game={game} key={game.id} id={game.id} />
            ))}
        </Games>
      </GameList>
    </AnimateSharedLayout>
  );
};

const GameList = styled(motion.div)`
  padding: 0 5rem;
  h2 {
    padding: 5rem 0;
  }
  @media (max-width: 470px) {
    padding: 0;
    h2 {
      padding: 1.5rem;
      justify-content: center;
      text-align: center;
    }
  }
`;
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Home;

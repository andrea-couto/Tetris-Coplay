import { Action, actionForKey, actionIsDrop } from "../../utilities/Action";
import { playerController } from "../../utilities/PlayerController";
import { useDropTime } from "../../hooks/useDropTime";
import { useInterval } from "../../hooks/useInterval";
import { useEffect, useCallback} from "react";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats
  });

  const handleInput = useCallback(({action}) => {
      playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver
    });
  }, [board, player, setGameOver, setPlayer]);

  useEffect(() => {
    const onKeyUp = ({ code }) => {
      console.log('A key up was pressed', code);
      const action = actionForKey(code);
      if (actionIsDrop(action)) resumeDropTime();
    };
  
    const onKeyDown = ({ code }) => {
      console.log('A key down was pressed', code);
      const action = actionForKey(code);
  
      if (action === Action.Pause) {
        if (dropTime) {
          pauseDropTime();
        } else {
          resumeDropTime();
        }
      } else if (action === Action.Quit) {
        setGameOver(true);
      } else {
        if (actionIsDrop(action)) pauseDropTime();
        if (!dropTime) {
          return;
        }
        handleInput({ action });
      }
    };
    
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [dropTime, handleInput, pauseDropTime, resumeDropTime, setGameOver]);

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  return (
    <></>
  );
};

export default GameController;
import cache from 'memory-cache';
import gameloop from 'node-gameloop';

export default (req, res) => {
  const id = cache.get('gameloop-id');
  if(!id) {
    startGame();
    res.status(201).json({status: "Started new game"})
  } else {
    res.status(200).json({status: "Joining game"})
  }
}

const startGame = () => {
  const id = gameloop.setGameLoop(function(delta) {
    let frameCount = cache.get('frameCount');
    console.log('Game loop update (frame=%s, delta=%s)', frameCount++, delta);
    cache.put('frameCount', frameCount);
  }, 1000 / 30);

  setTimeout(function() {
    console.log('10000ms passed, stopping the game loop');
    gameloop.clearGameLoop(id);
    cache.clear();
  }, 10000);

  cache.put('gameloop-id', id);
}

//The attack value represent the max attackvalue which will handled in the function
const ATTACK_VALUE = 10;
const MONSTER_ATTACH_VALUE = 20;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;
const enteredNum = prompt('Maximum life for you and the monster.', '100');
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';

const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

// This value assign the max value of the progress bar
let chosenMaxLife = parseInt(enteredNum);

let battleLog = [];
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  console.log('Is Not Valid Number, The maximun number will be 100');
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = 'MONSTER';
  } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = 'MONSTER';
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = 'Player';
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry.target = 'Player';
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }

  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  // Here is for save the last life score
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACH_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth,
  );
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    // currentPlayerHealth = chosenMaxLife
    currentPlayerHealth = initialPlayerHealth;
    alert('You would be dead but the Bonus life saved you!');
    // Adjust the UI
    setPlayerHealth(initialPlayerHealth);
  }

  console.log('Player health is ' + currentPlayerHealth);

  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lose!!!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Monster Won!',
      currentMonsterHealth,
      currentPlayerHealth,
    );

    return;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!!!');
    writeToLog(log, 'Player One', currentMonsterHealth, currentPlayerHealth);

    return;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have a draw');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A Draw',
      currentMonsterHealth,
      currentPlayerHealth,
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  // Ternary Operator
  let maxDamage = mode === 'ATTACK' ? ATTACK_VALUE : STRONG_ATTACK_VALUE;

  let logEvent =
    mode === 'ATTACK'
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  // if (mode === 'ATTACK') {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK
  // } else if (mode === 'STRONG_ATTACK') {
  //   maxDamage = strongAttackValue;
  //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
  // }

  const damage = dealMonsterDamage(maxDamage);
  console.log(damage);
  console.log(currentMonsterHealth);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);

  endRound();
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttachHandler(params) {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You Can't heal to more than max initial health");

    return;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth,
  );

  endRound();
}

function printLogHandler() {
  console.log(battleLog);
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttachHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);

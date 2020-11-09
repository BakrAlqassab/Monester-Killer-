//The attack value represent the max attackvalue which will handled in the function
const ATTACK_VALUE = 10;

const MONSTER_ATTACH_VALUE = 8;
const strongAttackValue =15;

// This value assign the max value of the progress bar
let chosenMaxLife = 10;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
adjustHealthBars(chosenMaxLife);
function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  console.log(damage);
  console.log(currentMonsterHealth);
  currentMonsterHealth -= damage;


  const playerDamage = dealPlayerDamage(MONSTER_ATTACH_VALUE);

  currentPlayerHealth -= playerDamage;

  console.log('Player health is ' + currentPlayerHealth);

  if (currentPlayerHealth <= 0 &&currentMonsterHealth > 0) {
    alert('You Lose!!!');
    return;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!!!');
    return;
  }else if(currentMonsterHealth <=0 && currentPlayerHealth  <= 0)
  {

    alert("You have a draw");
  }
}


function strongAttachHandler(params) {
  const damage = dealMonsterDamage(strongAttackValue);
  console.log(damage);
  console.log(currentMonsterHealth);
  currentMonsterHealth -= damage;


  const playerDamage = dealPlayerDamage(strongAttackValue);

  currentPlayerHealth -= playerDamage;

  console.log('Player health is ' + currentPlayerHealth);

  if (currentPlayerHealth <= 0 &&currentMonsterHealth > 0) {
    alert('You Lose!!!');
    return;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!!!');
    return;
  }else if(currentMonsterHealth <=0 && currentPlayerHealth  <= 0)
  {

    alert("You have a draw");
  }
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttachHandler);

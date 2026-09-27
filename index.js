const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const rl = readline.createInterface({ input: stdin, output: stdout });
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

async function play() {
  console.log('I picked a number between 1 and 100.');
  stdout.write('Your guess: ');

  for await (const answer of rl) {
    const guess = Number(answer.trim());

    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      console.log('Please enter a whole number between 1 and 100.');
      stdout.write('Your guess: ');
      continue;
    }

    attempts += 1;

    if (guess < secretNumber) {
      console.log('Too low.');
    } else if (guess > secretNumber) {
      console.log('Too high.');
    } else {
      console.log(`Correct! You guessed the number in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}.`);
      break;
    }

    stdout.write('Your guess: ');
  }

  rl.close();
}

play().catch((error) => {
  console.error('The game could not continue:', error.message);
  rl.close();
  process.exitCode = 1;
});
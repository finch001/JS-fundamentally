const compose = require('./compose');
const hello = name => `hi: ${name}`;
const upper = statement => statement.toUpperCase();

const welcome = compose(
  hello,
  upper
);

console.log(welcome('finch'));

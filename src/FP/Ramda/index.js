const R = require('ramda');
const { equals, gte, both, compose, prop, __ } = require('ramda');

// const Articles = [
//   {
//     title: 'NoDBA',
//     words: 561,
//     tags: ['nosql', 'people', 'orm'],
//     type: 'bliki'
//   },
//   {
//     title: 'Infodeck',
//     words: 1145,
//     tags: ['nosql', 'writing'],
//     type: 'bliki'
//   },
//   {
//     title: 'OrmHate',
//     words: 1718,
//     tags: ['nosql', 'orm'],
//     type: 'bliki'
//   },
//   { title: 'ruby', words: 1313, tags: ['ruby'], type: 'article' },
//   { title: 'DDD_Aggregate', words: 482, tags: ['nosql', 'ddd'], type: 'bliki' }
// ];

// const totalWord = Articles.map(a => a.words).reduce((acc, cur) => acc + cur, 0);

// console.log(totalWord);

// const artileGroup = R.groupBy(item => item.type, Articles);
// const articles = Object.entries(artileGroup).map(([key, value]) => ({
//   key,
//   size: value.length
// }));

// // console.log(articles);

// const articlesByTag = Articles.map(a =>
//   a.tags.map(tag => ({
//     tag,
//     article: a
//   }))
// );

// const list = R.flatten(articlesByTag);
// const groupArticle = R.groupBy(item => item.tag, list);
// console.log(groupArticle);
// const articleGroup = Object.entries(groupArticle).map(([key, value]) => ({
//   tag: key,
//   article: value.length,
//   words: value.reduce((acc, cur) => acc + cur.article.words, 0)
// }));
// console.log(articleGroup);

const person = {
  birthCountry: 'china',
  age: 23
};
const CHINA = 'china';

const wasChina = person => equals(person.birthCountry, CHINA);
const isOver18 = person => gte(person.age, 18);

const isChina = compose(
  equals(CHINA),
  prop('birthCountry')
);

const over18 = compose(
  gte(__, 18),
  prop('age')
);

const isEligibleToVote = both(isChina, over18);
const isEligible = isEligibleToVote(person);
console.log('finch isEligibleToVote', isEligible);

const newObject = R.assocPath(['name', 'last'], 'new Name', person);
console.log(newObject);
const person1 = R.dissocPath(['name', 'last'], person);
console.log(person1);
if (R.has('age', person1)) {
  console.log('age');
}
// path


// tail 去头
// init 去尾

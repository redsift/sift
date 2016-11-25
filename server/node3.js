module.exports = function (got) {
  const [ emotion ] = got.query;
  const parsed = got.in.data.map(d => JSON.parse(d.value));
  const words = parsed.reduce((a,b) => [...a, ...b], []);
  const count = {};

  words.forEach(word => { count[word] = (count[word] || 0) + 1 });

  return Object.keys(count).map(word => ({
    name: emotion,
    key: word,
    value: count[word]
  }))
}

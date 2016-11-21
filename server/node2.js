module.exports = function (got) {
  const parsed = got.in.data.map(d => JSON.parse(d.value));
  const threadLength = parsed.length;
  const sum = parsed.reduce((a, b) => a + b, 0);
  const average = threadLength ? sum/threadLength : 0;
  const [threadId] = got.query;

  return [{
    name: 'threads',
    key: threadId,
    value: { list: average }
  }];
}

module.exports = function (got) {
  const parsed = got.in.data.map(d => JSON.parse(d.value));
  const [threadId] = got.query;

  return [{
    name: 'threads',
    key: threadId,
    value: { list: parsed.pop() }
  }];
}

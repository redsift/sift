module.exports = function (got) {
  const json = got.in.data.map(d => JSON.parse(d.value));

  const query = got.query;
  const threadId = query[0];
  const newestCount = json
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .shift().count;

  return [{
    name: 'threads',
    key: threadId,
    value: {
      // only information under the 'list' key
      // will be propagated to the email-client-controller.js
      list: newestCount
    }
  }];
}

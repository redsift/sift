/**
 * Example Sift Sift. DAG's 'Node1' node implementation
 */
'use strict';

const sentiment = require('sentiment');

module.exports = function (got) {
  const inData = got.in;
  const json = inData.data.map(d => JSON.parse(d.value));
  const counts = json.map(value => {
    const text = value.textBody || value.strippedHtmlBody || '';
    const score = sentiment(value.textBody).comparative;

    return {
      key: `${value.threadId}/${value.id}`,
      value: score
    }
  });

  return counts;
};

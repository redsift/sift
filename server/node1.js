/**
 * Happy Sift. DAG's 'Node1' node implementation
**/
'use strict';

var sentiment = require ('sentiment');

module.exports = function (got) {
  const ret = [];
  const json = got.in.data.map(d => JSON.parse(d.value));
  const analysis = json.forEach(value => {
    const { textBody, strippedHtmlBody, threadId, id, email } = value;
    const text = textBody || strippedHtmlBody || '';
    const analysis = sentiment(text);
    const { score, positive, negative } = analysis;

    ret.push({name:'emotions', key:`positive/${id}`, value: positive });
    ret.push({name:'emotions', key:`negative/${id}`, value: negative });
    ret.push({name: 'scores', key: `${threadId}/${id}`, value: score});
  });

  return ret;
};

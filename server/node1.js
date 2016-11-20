/**
 * Example Sift Sift. DAG's 'Node1' node implementation
 */
'use strict';

const textUtils = require('@redsift/text-utilities');

// Entry point for DAG node
// got ={
//   in: ... // contains the key/value pairs that match the given query
//   with: ... // key/value pairs selected based on the with selection
//   lookup: ... // an array with result of lookup for a specific key
//   query: ... // an array containing the key hierarchy
// }
// for more info have a look at:
// http://docs.redsift.com/docs/server-code-implementation
module.exports = function (got) {
  const inData = got.in;
  const json = inData.data.map(d => JSON.parse(d.value));
  const others = json.filter(j => j.user !== j['from'].email);
  const counts = others.map(value => {
    const text = value.textBody || value.strippedHtmlBody || '';
    const count = textUtils.splitWords(textUtils.trimEmailThreads(text)).length;

    return {
      key: `${value.threadId}/${value.id}`,
      value: count
    }
  });

  return counts;
};

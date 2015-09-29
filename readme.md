Usage:

```
var ngram = require('simple-ngram-markov');

var options = {
  length: 2, // ngram size; default is 2
  stripPunctuation: true // default is true
};

var model = ngram.createModel(options);

addSentenceToModel(model, "Hey, what the heck is up man.");
addSentenceToModel(model, "Honestly I really just don't believe it. Simply.");

var sentence = generateSentence(model, 10); // 10 is the desired length of the sentence
```
Usage:

```
var ngram = require('simple-ngram-markov');

var options = {
  length: 2, // ngram size; default is 2
  stripPunctuation: true // default is true
};

var model = ngram.createModel(options);

ngram.addSentenceToModel(model, "Hey, what the heck is up man.");
ngram.addSentenceToModel(model, "Honestly I really just don't believe it. Simply.");

var sentence = ngram.generateSentence(model, 10); // 10 is the desired length of the sentence
```
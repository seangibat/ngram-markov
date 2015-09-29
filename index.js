var createModel = function(options) {
  options = options || {};
  var model = {};
  model.settings = {
    length: options.length || 2,
    stripPunctuation: options.stripPunctuation || true
  };
  model.ngrams = {};
  model.keys = [];
  return model;
};

var addSentenceToModel = function(model, sentence){
  var length = model.settings.length;
  var tokens;

  if (model.settings.stripPunctuation) {
    tokens = sentence.replace(/[^\w\s]+/g, "");
  }

  tokens = tokens.trim().replace(/\s+/g, " ").split(" ");

  for (var i = 0; i < tokens.length - length + 1; i++) {
    var key = [];
    for (var n = i; n < i + (length - 1); n++) {
      key.push(tokens[n]);
    }
    var stringKey = key.join(" ");
    if (model.ngrams[stringKey]) {
      model.ngrams[stringKey].push(tokens[n]);
    } else {
      model.ngrams[stringKey] = [tokens[n]];
      model.keys.push(stringKey);
    }
  }

  return model;
};

var randomItemFromArray = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateSentence = function(model, desiredSentenceLength){
  var randStart = randomItemFromArray(model.keys);
  var sentence = randStart.split(" ");
  var lastToken = randStart.split(" ");
  var newToken;

  while (sentence.length < desiredSentenceLength) {
    newToken = randomItemFromArray(model.ngrams[lastToken.join(" ")]);
    sentence.push(newToken);
    lastToken.shift();
    lastToken.push(newToken);

    if (!model.ngrams[lastToken.join(" ")]) {
      sentence[sentence.length-1] += ".";
      lastToken = randomItemFromArray(model.keys).split(" ");
    }
  }

  return sentence.join(" ");
};

module.exports = { 
  createModel: createModel, 
  addSentenceToModel: addSentenceToModel, 
  generateSentence: generateSentence,
};

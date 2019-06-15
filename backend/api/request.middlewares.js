/*
 This file defines the different custom middlewares.
*/

const missingIn = (requiredList, containerObj) => {
  let missing = [];
  for(const item of requiredList) {
      if(!containerObj[item]) {
        missing.push(item);
      }
  }
  return missing;
}

module.exports.verifyRequiredParams = (requiredParams) => {
  return (req, res, next) => {
      let missingQueries = missingIn(requiredParams, req.body);
      if (missingQueries.length > 0) {
          return res.status(400).json({
              error: `The request is missing these required params in body: ${missingQueries.join(", ")}.`
          });
      } else {
          next();
      }
  }
}

module.exports.verifyRequiredQueries = (requiredParams) => {
  return (req, res, next) => {
      let missingQueries = missingIn(requiredParams, req.query);
      if (missingQueries.length > 0) {
          return res.status(400).json({
              error: `The request is missing these required params in query: ${missingQueries.join(", ")}.`
          });
      } else {
          next();
      }
  }
}
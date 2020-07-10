//debouncing an input means waiting for
//some time to pass after the last event to actually do
//something
const debounce = (func, delay = 1000) => {
  let timeoutId;
  //sheild and determines how many times func
  //can be run
  return (...args) => {
    if(timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      //apply takes argements and pass them in
      //as sepates values
      func.apply(null, args);
    }, delay);
  };
};

//this will be a wrapper function that resticts calls to onInput
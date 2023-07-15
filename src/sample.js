import React, { useState, useEffect } from 'react';

function Sample() {
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFindButton = () => {
    setAnswer('3');
    setShowAnswer(true);
    window.history.pushState(null, '', '/answer'); /* pushstate is being used to add a new entry to the 
    browser's history stack */
    // History stack is the collection of all pages visisted in the current browser tab 

  };

  useEffect(() => {
    const handlePopstate = () => {
      setShowAnswer(false);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <>
      {!showAnswer ? (
        <>
          <input type="text" value="1+2" readOnly />
          <button onClick={handleFindButton}>Find</button>
        </>
      ) : (
        <>
          <h1>The answer is {answer}</h1>
        </>
      )}
    </>
  );
}


export default Sample;
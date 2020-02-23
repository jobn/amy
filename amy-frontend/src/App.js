import React from 'react';
import { useMachine } from '@xstate/react';
import { questionMachine } from './questionMachine';
import { mockBackend } from './api';
import Answer from './Answer';

function App() {
  const [question, setQuestion] = React.useState('');
  const fetchAnswers = () => mockBackend(question);
  const [state, send] = useMachine(questionMachine, {
    services: { fetchAnswers }
  });

  const handleSubmit = event => {
    event.preventDefault();
    send('FETCH');
  };

  return (
    <div>
      <div style={{ border: '1px solid red', margin: '1rem', padding: '1rem' }}>
        <h4>STATE VALUE</h4>
        <p>{JSON.stringify(state.value)}</p>

        <h4>STATE CONTEXT</h4>
        <p>{JSON.stringify(state.context)}</p>
      </div>

      <div
        style={{ border: '1px solid blue', margin: '1rem', padding: '1rem' }}
      >
        {state.matches('idle') && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {state.matches('fetchingAnswers') && <h4>fetching ...</h4>}

        {state.matches('displayingAnswers.withoutAnswers') && (
          <h4>We could not answers your question</h4>
        )}

        {state.matches('displayingAnswers.withAnswers') && (
          <>
            <h4>Answers</h4>

            {state.context.answers.map(answer => (
              <Answer key={answer.id} answerRef={answer.ref} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

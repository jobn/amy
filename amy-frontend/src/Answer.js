import React from 'react';
import { useService } from '@xstate/react';

function Answer({ answerRef }) {
  const [state, send] = useService(answerRef);

  console.log('state', state.context);
  return (
    <div
      style={{ margin: '.5rem', padding: '1rem', border: '1px solid green' }}
    >
      <p>{state.context.content}</p>
      <p>{state.value}</p>

      <button onClick={() => send('ACCEPT')}>accept</button>
      <button onClick={() => send('DISMISS')}>dismiss</button>
    </div>
  );
}

export default Answer;

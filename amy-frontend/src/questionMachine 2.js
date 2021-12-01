import { Machine, assign, spawn, sendParent } from 'xstate';

export const answerMachine = Machine({
  id: 'answer',
  initial: 'idle',
  context: {
    id: null,
    content: ''
  },
  states: {
    idle: {
      on: {
        ACCEPT: {
          target: 'accepted',
          actions: [
            sendParent(ctx => ({ type: 'ANSWER.ACCEPTED', answer: ctx }))
          ]
        },
        DISMISS: {
          target: 'dismissed',
          actions: [
            sendParent(ctx => ({ type: 'ANSWER.DISMISSED', answer: ctx }))
          ]
        }
      }
    },
    accepted: {
      type: 'final'
    },
    dismissed: {
      type: 'final'
    }
  }
});

export const questionMachine = Machine(
  {
    id: 'question',
    initial: 'idle',
    context: {
      answers: [],
      errorMessage: ''
    },

    states: {
      idle: {
        on: {
          FETCH: 'fetchingAnswers'
        }
      },

      fetchingAnswers: {
        invoke: {
          src: 'fetchAnswers',
          onDone: [
            {
              target: 'displayingAnswers.withAnswers',
              actions: ['setAnswers'],
              cond: 'hasAnswers'
            },
            {
              target: 'displayingAnswers.withoutAnswers',
              actions: ['setAnswers']
            }
          ],
          onError: { target: 'displayingError', actions: ['setErrorMessage'] }
        }
      },

      displayingAnswers: {
        initial: 'withoutAnswers',
        states: {
          withAnswers: {
            on: {
              'ANSWER.ACCEPTED': {
                actions: ['answerAccepted']
              },
              'ANSWER.DISMISSED': {
                actions: ['answerDismissed']
              }
            }
          },
          withoutAnswers: {}
        }
      },

      displayingError: {
        on: {
          FETCH: 'fetchingAnswers'
        }
      }
    }
  },
  {
    actions: {
      setAnswers: assign((context, event) => ({
        answers: event.data.answers.map(answer => ({
          ...answer,
          ref: spawn(answerMachine.withContext(answer), `answer-${answer.id}`)
        }))
      })),

      setErrorMessage: assign((ctx, event) => ({
        errorMessage: event.error
      })),

      answerAccepted: assign((context, event) => ({
        answers: context.answers.filter(answer => answer.id !== event.answer.id)
      })),

      answerDismissed: assign((context, event) => ({
        answers: context.answers.filter(answer => answer.id !== event.answer.id)
      }))
    },

    guards: {
      hasAnswers: (ctx, event) =>
        event.data.answers && event.data.answers.length > 0
    },

    services: {
      fetchAnswers: () => {
        throw new Error(
          'fetchAnswers service should be implemented by consumer'
        );
      }
    }
  }
);

window.machine = questionMachine;

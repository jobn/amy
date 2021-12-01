const answerResponse = {
  answers: [
    {
      id: 1,
      content: 'answer content'
    },
    {
      id: 2,
      content: 'other answer content'
    }
  ]
};

export const mockBackend = question => {
  console.log('mockBackend hit with', question);
  return new Promise(resolve => setTimeout(() => resolve(answerResponse), 500));
};

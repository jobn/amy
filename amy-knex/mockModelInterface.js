const mockModelInterface = (question, instanceName) =>
  Promise.resolve([
    {
      content: `Some awesome answer for the question: ${question}`,
      additionalContent: {
        type: "media",
        url: "buha"
      }
    },
    {
      content: `event better answer for the costumors of ${instanceName}`,
      additionalContent: {}
    }
  ]);

module.exports = mockModelInterface;

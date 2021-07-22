export default {
  async loadAllQuestions(context) {
    const url = "";
    const response = await fetch(url);

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const questions = [];

    for (const key in responseData) {
      const question = {
        id: responseData[key].Id,
        type: responseData[key].Type,
        description: responseData[key].Description,
        neededNames: responseData[key].NeededNames,
      };

      questions.push(question);
    }

    context.commit("setQuestions", questions);
  },
};

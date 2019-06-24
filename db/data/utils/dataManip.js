const formatDate = comments => {
  const formattedArr = [];
  comments.forEach(obj => {
    const newObj = obj;
    newObj.created_at = new Date(newObj.created_at);
    formattedArr.push(newObj);
  });
  return formattedArr;
};

const createReferenceObject = (comments, articles) => {
  const ref = {};
  comments.forEach(comment => {
    const artIdObj = articles.find(article => {
      return article.title === comment.belongs_to;
    });
    ref[comment.belongs_to] = artIdObj.article_id;
  });
  return ref;
};

const formatComments = (comments, refObj) => {
  const formattedComments = [];
  comments.forEach((person, index) => {
    formattedComments.push({ ...comments[index] });
  });
  formattedComments.forEach(comment => {
    comment.author = comment.created_by;
    delete comment.created_by;
    comment.article_id = refObj[comment.belongs_to];
    delete comment.belongs_to;
  });
  return formattedComments;
};

module.exports = { formatDate, createReferenceObject, formatComments };

const formatDate = comments => {
  const formattedArr = [];
  comments.forEach(({ created_at, ...restOfObject }) => {
    formattedArr.push({
      created_at: new Date(created_at),
      ...restOfObject
    });
  });
  return formattedArr;
};

const createReferenceObject = articles => {
  const artSpread = [...articles];
  const refObj = {};
  artSpread.forEach(article => {
    refObj[article.title] = article.article_id;
  });
  return refObj;
};

const formatComments = (comments, refObj) => {
  return comments.map(comment => {
    let { belongs_to, created_by, created_at, ...restOfComment } = comment;
    const article_id = refObj[belongs_to];
    const author = comment.created_by;
    created_at = new Date(comment.created_at);
    return { article_id, author, created_at, ...restOfComment };
  });
};

module.exports = { formatDate, createReferenceObject, formatComments };

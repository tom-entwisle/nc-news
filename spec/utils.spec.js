const { expect } = require("chai");
const {
  articlesData,
  topicsData,
  usersData,
  commentsData
} = require("../db/data/test-data/index");
const {
  formatDate,
  createReferenceObject,
  formatComments
} = require("../db/data/utils/");

describe("formatDate()", () => {
  it("changes the date in milliseconds into a properly formatted date", () => {
    const input = articlesData;
    const actual = formatDate(input);
    let expected = new Date(input[0].created_at);
    expect(actual[0].created_at).to.eql(expected);
    expected = new Date(input[3].created_at);
    expect(actual[3].created_at).to.eql(expected);
    expected = new Date(input[5].created_at);
    expect(actual[5].created_at).to.eql(expected);
  });
});

describe("createReferenceObject", () => {
  it("creates a reference object using the articles data and DOES NOT MUTATE the source data", () => {
    const input = [];
    const output = {};
    expect(createReferenceObject(input)).to.eql(output);
  });
  it("returns a reference object containing 'title' and 'article_id' key-value pairs", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        article_id: 1
      }
    ];
    const output = {
      "Living in the shadow of a great man": 1
    };
    expect(createReferenceObject(input)).to.eql(output);
  });
  it("returns a reference object containing 'title' and 'article_id' key-value pairs when passed an array of multiple objects", () => {
    const input = [
      { title: "Living in the shadow of a great man", article_id: 1 },
      { title: "Sony Vaio; or, The Laptop", article_id: 2 },
      { title: "Eight pug gifs that remind me of mitch", article_id: 3 },
      { title: "Student SUES Mitch!", article_id: 4 }
    ];
    const output = {
      "Living in the shadow of a great man": 1,
      "Sony Vaio; or, The Laptop": 2,
      "Eight pug gifs that remind me of mitch": 3,
      "Student SUES Mitch!": 4
    };
    expect(createReferenceObject(input)).to.eql(output);
  });
});

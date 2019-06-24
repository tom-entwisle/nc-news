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
} = require("../db/data/utils/dataManip");

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

describe("createReferenceObject()", () => {
  it("takes the comments data and the inserted articles data as arguments and creates an object using the belongs_to value from the comments as the keys and the article_id values from the articles data as the values", () => {
    const input = commentsData;
    const input2 = articlesData;
    input2.forEach((article, index) => {
      article.article_id = index + 1;
    });
    const actual = createReferenceObject(input, input2);
    const expected = {
      "They're not exactly dogs, are they?": 9,
      "Living in the shadow of a great man": 1,
      "UNCOVERED: catspiracy to bring down democracy": 5,
      A: 6
    };
    expect(actual).to.eql(expected);
  });
});

describe("formatComments()", () => {
  xit("converts the comments data to a format accepted by the comments table (using the reference object created by createReferenceObject())", () => {
    const input = commentsData;
    let input2 = articlesData;
    input2.forEach((article, index) => {
      article.article_id = index + 1;
    });
    input2 = createReferenceObject(input, input2);
    const actual = formatComments(input, input2);
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        created_at: "1511354163389",
        author: "butter_bridge",
        article_id: 9
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        created_at: 1479818163389,
        author: "butter_bridge",
        article_id: 1
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        votes: 100,
        created_at: 1448282163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        votes: -100,
        created_at: 1416746163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: "I hate streaming noses",
        votes: 0,
        created_at: 1385210163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: "I hate streaming eyes even more",
        votes: 0,
        created_at: 1353674163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: "Lobster pot",
        votes: 0,
        created_at: 1322138163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: "Delicious crackerbreads",
        votes: 0,
        created_at: 1290602163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: "Superficially charming",
        votes: 0,
        created_at: 1259066163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: "git push origin master",
        votes: 0,
        created_at: 1227530163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: "Ambidextrous marsupial",
        votes: 0,
        created_at: 1195994163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: "Massive intercranial brain haemorrhage",
        votes: 0,
        created_at: 1164458163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body: "Fruit pastilles",
        votes: 0,
        created_at: 1132922163389,
        author: "icellusedkars",
        article_id: 1
      },
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        votes: 16,
        created_at: 1101386163389,
        author: "icellusedkars",
        article_id: 5
      },
      {
        body: "I am 100% sure that we're not completely sure.",
        votes: 1,
        created_at: 1069850163389,
        author: "butter_bridge",
        article_id: 5
      },
      {
        body: "This is a bad article name",
        votes: 1,
        created_at: 1038314163389,
        author: "butter_bridge",
        article_id: 6
      },
      {
        body: "The owls are not what they seem.",
        votes: 20,
        created_at: 1006778163389,
        author: "icellusedkars",
        article_id: 9
      },
      {
        body: "This morning, I showered for nine minutes.",
        votes: 16,
        created_at: 975242163389,
        author: "butter_bridge",
        article_id: 1
      }
    ];
    expect(actual).to.eql(expected);
  });
});

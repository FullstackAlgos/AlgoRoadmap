const Question = require("./Question");
const Tag = require("./Tag");
const User = require("./user");
const QuestionTag = require("./QuestionTag");
const UserQuestion = require("./userQuestion");
const Like = require("./Like");

Question.belongsToMany(Tag, { through: QuestionTag });
Tag.belongsToMany(Question, { through: QuestionTag });

User.belongsToMany(Question, { through: UserQuestion });
Question.belongsToMany(User, { through: UserQuestion });

User.hasMany(Like);
Question.hasMany(Like);

module.exports = {
  Question,
  Tag,
  User,
  QuestionTag,
  UserQuestion,
  Like
};

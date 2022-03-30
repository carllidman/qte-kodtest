const express = require("express");
const path = require("path");
const { Sequelize, Model, DataTypes } = require("@sequelize/core");
const { application } = require("express");

const app = express();
const sequelize = new Sequelize("sqlite:memory");

app.use(express.static(path.join(__dirname, "build")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(express.json());

(async () => {
    await sequelize.sync({force: true})
})();

class Comment extends Model {}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    author: DataTypes.STRING,
    text: DataTypes.STRING,
    likes: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: "Comment"
});

class Answer extends Model {}
Answer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    author: DataTypes.STRING,
    text: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    parent: DataTypes.INTEGER
}, {
    sequelize,
    modelName: "Answer"
});


app.post("/api/add_comment", async (req, res) => {
    const newComment = Comment.build(req.body);
    await newComment.save().then(() => res.sendStatus(200))
    .catch((error) => {
        console.error(error);
        res.sendStatus(500)
    });
});

app.post("/api/add_answer", async (req, res) => {
    const newAnswer = Answer.build(req.body);
    await newAnswer.save().then(() => res.sendStatus(200))
    .catch((error) => {
        console.error(error);
        res.sendStatus(500)
    });
});

app.post("/api/like_comment", async (req, res) => {
    await Comment.update({
        likes: sequelize.literal("likes + 1")
    }, {
        where: {
            id: req.body.id
        } 
    })
    .then(res.sendStatus(200))
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}) 

app.post("/api/like_answer", async (req, res) => {
    await Answer.update({
        likes: sequelize.literal("likes + 1")
    }, {
        where: {
            id: req.body.id
        } 
    })
    .then(res.sendStatus(200))
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}) 

app.get("/api/get_data", async function(req, res) {
    res.send(JSON.stringify({
        comments: await Comment.findAll().then((res) => res.map((comment) => comment.get({plain: true}))),
        answers: await Answer.findAll().then((res) => res.map((answer) => answer.get({plain: true})))
    }));
});

app.listen(3000);
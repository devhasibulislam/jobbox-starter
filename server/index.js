require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 8080;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@todoapp.mfoky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("jobbox-starter");
    const userCollection = db.collection("user");

    console.log("Successfully connected with DB");

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();

      res.send({ status: true, data: users });
    });

    app.post("/user", async (req, res) => {
      const user = req.body;

      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;

      const result = await userCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });
  } finally {
    // await client.close();
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).send({
    acknowledgement: true,
    message: "OK",
    description: "Successfully connected Jobbox Starter",
  });
});

app.listen(port, () => {
  console.log(`Jobbox Starter listening on port ${port}`);
});

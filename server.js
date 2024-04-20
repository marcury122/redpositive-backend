const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { userRouter } = require("./routes/userRoute");
const { sendMail } = require("./controllers/mailController");
// const UserModel = require("./models/userSchema.js");
// const userRouter = require("./routes/userRoute.js");
// const bodyParser = require("body-parser");
// const { default: userRouter } = require("./routes/userRoute.js");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000; // Choose your desired port



const url = "mongodb+srv://mehuljain0503:1234@cluster0.5dae3ag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const url = "mongodb://localhost:27017/redpositive";

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.use("/api/v1/user", userRouter);

app.post("/api/v1/send-email", async (req, res) => {
  try {
    console.log(req.body);
    const { selectedRow } = req.body;
    if (selectedRow.length === 0) {
      console.log("No data to send");
      return;
    }
    await sendMail(selectedRow);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const authRouter = require("./authRouter/authRouter");
const { PORT, mongoUri } = require("./config");

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const clientsRoutes = require("./routes/api/clients");
const clinicsRoutes = require("./routes/api/clinics");
const illnessesRoutes = require("./routes/api/illnesses");
const petsRoutes = require("./routes/api/pets");
const treatmentsRoutes = require("./routes/api/treatments");
const doctorsRoutes = require("./routes/api/doctors");
const servicesRoutes = require("./routes/api/services");

const path = require("path");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

app.use(clientsRoutes);
app.use(clinicsRoutes);
app.use(illnessesRoutes);
app.use(petsRoutes);
app.use(treatmentsRoutes);
app.use(doctorsRoutes);
app.use(servicesRoutes);

//   if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/dist"));
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
//     });
//   }
app.use("/auth", authRouter);

app.get("*", (req, res) => {
  res.send("Hey, everything is fine!");
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

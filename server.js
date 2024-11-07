import app from "./app.js";

const PORT = 1000;

app.get("/", (req, res) => {
  res.send(`server berjalan di ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

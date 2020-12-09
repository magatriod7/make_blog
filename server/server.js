const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
    console.log(`Response complete`);
})

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
})
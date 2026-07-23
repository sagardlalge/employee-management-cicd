const express = require('express');
const app = express();

throw new Error("Intentional application failure");

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

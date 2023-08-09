// Dependencies
const express = require('express');
const Stack = require('./src/stack');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

let pagerStack;
let pagerQueue;
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'hi'});
});

// initialize our stack of pagers
app.post('/add-pagers', (req, res) => {
    pagersStack = new Stack(req.body);
    pagerQueue = new Queue();
    res.json({pagersStack}, {pagerQueue});
});

// customer returns a pager
app.post('/add-pagers', (req, res) => {
    pagersStack.addToStack(req.body);
    res.json(pagerStack);
});
// Starts the server to begin listening
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});

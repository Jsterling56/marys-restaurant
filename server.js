// Dependencies
const express = require('express');
const Stack = require('./src/stack');
const Queue = require('./src/Queue');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

let pagerStack;
let pagerQueue;

let emptyTableStack;
let seatedTableQueue;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'hi' });
});

// initialize our stack of pagers
app.post('/add-pagers', (req, res) => {
    pagerStack = new Stack(req.body);
    pagerQueue = new Queue();
    emptyTableStack = new Stack([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    seatedTableQueue = new Queue()
    res.json({ pagerStack }, { pagerQueue });
});

app.post('/customerDoneEating', async (req, res)=>{
    const freeTable = seatedTableQueue.removeFromQueue()

    if (pagerQueue.container.length > 0) {
        const pager = pagerQueue.removeFromQueue()
        pagerStack.addToStack(pager);
        const customerTable = emptyTableStack.removeFromStack()
        seatedTableQueue.addToQueue(customerTable)
        res.status(200).json({ pagerStack, pagerQueue })
    }

})


// customer returns a pager
app.post('/customerCheckIn', (req, res) => {
    if (emptyTableStack.container.length !== 0) {
        const pager = pagerQueue.removeFromQueue()
        pagerStack.addToStack(pager);
        res.status(200).json({ pagerStack, pagerQueue })
    }

});

app.post('/handToCustomer', async (req, res) => {
    if (emptyTableStack.container.length === 0) {
        const pager = pagerStack.removeFromStack()
        pagerQueue.addToQueue(pager)
        res.status(200).json(pager)

    } else {
        const firstEmptyTable = emptyTableStack.removeFromStack()
        seatedTableQueue.addToQueue(firstEmptyTable)
    }
    const pager = pagerStack.removeFromStack()
    pagerQueue.addToQueue(pager)

    res.status(200).json(pager)
})

app.get('/status', (req, res) => {
    res.status(200).json(pagerStack, pagerQueue)
})
// Starts the server to begin listening
app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});

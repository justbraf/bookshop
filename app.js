import express from 'express'
import cors from 'cors'
import { PORT, MongoDBURL } from './config.js'
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"
const app = express()

app.use(express.json())
app.use(cors())

const client = new MongoClient(MongoDBURL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const booksDB = client.db("myBookShop")
const myBooks = booksDB.collection("booksCollection")

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Hello there, how are you?!</h1>")
})

app.get('/shop', (req, res) => {
    // route show all books
    myBooks.find().toArray()
        .then(response => {
            // console.log(response)
            res.status(200).send(response)
        })
        .catch(err => console.log(err))
    // return res.status(200).send("<a href='/'> Home</a>")
})

app.get('/shop/:id', (req, res) => {
    // route show a specific book
    const data = req.params

    const filter = {
        "_id": new ObjectId(data.id)
    }

    myBooks.findOne(filter)
        .then(response => {
            // console.log(response)
            res.status(200).send(response)
        })
        .catch(err => console.log(err))
    // return res.status(200).send(`<a href='/'> Book: ${data.id}</a>`)
})

app.post('/admin/savebook', (req, res) => {
    // Route adds a new book
    const data = req.body
    let message = {}

    if (!data.title)
        // return res.status(400).send("No title found.")
        message.error ? message.error += "No title found. " : message.error = "No title found. "
    if (!data.author)
        // return res.status(400).send("No author found.")
        message.error ? message.error += "No author found. " : message.error = "No author found. "
    if (!data.price)
        // return res.status(400).send("No price found.")
        message.error ? message.error += "No price found. " : message.error = "No price found. "

    if (!message.error) {
        myBooks.insertOne(data)
            .then(response => {
                // console.log(response)
                return res.status(201).send({ "message": "addedd successfully" })
                // return res.status(201).send(JSON.stringify(response))
            })
            .catch(err => console.log(err))
    }
    else
        return res.status(400).send(message)
})

app.delete('/admin/remove/:id', (req, res) => {
    const data = req.params

    const filter = {
        "_id": new ObjectId(data.id)
    }

    myBooks.deleteOne(filter)
        .then(response => {
            // console.log(response)
            return res.status(200).send(response)
        })
        .catch(err => console.log(err))
})

app.put('/admin/update/:id/', (req, res) => {
    const data = req.params
    const docData = req.body

    const filter = {
        "_id": new ObjectId(data.id)
    }

    const updDoc = {
        $set: {
            ...docData //docData.price, docData.cover
        }
    }

    myBooks.updateOne(filter, updDoc)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(err => console.log(err))
})
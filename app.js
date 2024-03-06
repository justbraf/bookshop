import express, { response } from 'express'
import { PORT, MongoDBURL } from './config.js'
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb"
const app = express()

app.use(express.json())

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
    myBooks.find().toArray()
        .then(response => {
            // return res.status(200).send(`<a href='/'> Book: ${JSON.stringify(response)}</a>`)
            return res.status(201).send(response)
            // console.log(response)
        })
        .catch(error => console.log(error))
    // return res.status(200).send("<a href='/'> Home</a>")
})

app.get('/shop/:id', (req, res) => {
    myBooks.findOne({ _id: new ObjectId(req.params.id) })
        .then(response => {
            // return res.status(200).send(`<a href='/'> Book: ${JSON.stringify(response)}</a>`)
            return res.status(201).send(response)
            // console.log(response)
        })
        .catch(error => console.log(error))
})

app.get('/shop/remove/:id', (req, res) => {
    myBooks.deleteOne({ _id: new ObjectId(req.params.id) })
        .then(response => {
            // return res.status(200).send(`<a href='/'> Book: ${JSON.stringify(response)}</a>`)
            return res.status(201).send(response)
            // console.log(response)
        })
        .catch(error => console.log(error))
})

app.post('/savebook', (req, res) => {
    const data = req.body
    if (!data.title)
        return res.status(400).send("No title found.")
    if (!data.author)
        return res.status(400).send("No author found.")
    if (!data.price)
        return res.status(400).send("No price found.")

    myBooks.insertOne(data, (error, response) => {
        if (error) {
            console.log("An error occurred!")
            return res.sendStatus(500)
        }
    })
    return res.status(201).send(JSON.stringify(data))
})

app.post('/shop/update/:id', (req, res) => {
    const data = req.body
    if (!data.title && !data.author && !data.price)
        return res.status(400).send("No data received.")

    myBooks.updateOne({ _id: new ObjectId(req.params.id) }, {$set: data}, (error, response) => {
        if (error) {
            console.log("An error occurred!")
            return res.sendStatus(500)
        }
    })
    return res.status(201).send(JSON.stringify(data))
})

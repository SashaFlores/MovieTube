import app from '../server'
import mongodb from 'mongodb'
import ReviewDAO from './back-end/dao/ReviewDAO.js.js'

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['Mongo_USR']
const mongo_password = process.env['Mongo_PAS']
const uri = 'mongodb+srv://${mongo_username}:${mongo_password}@cluster0.yus8l0h.mongodb.net/?retryWrites=true&w=majority'
const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 100,
        wtimeoutMS: 2500,
        iseNewUrlParser: true
    })
    .catch(e => {
        console.e(e.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const User = require('./model/User')

const app = express()
const port = Number(process.env.PORT) || 5000
const mongoUri = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.get('/api/users', async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        res.json(users)
    } catch (error) {
        next(error)
    }
})

app.get('/api/users/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(user)
    } catch (error) {
        next(error)
    }
})

app.post('/api/users', async (req, res, next) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
        })
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
})

app.put('/api/users/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, email: req.body.email },
            { new: true, runValidators: true },
        )

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(user)
    } catch (error) {
        next(error)
    }
})

app.delete('/api/users/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

app.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: Object.values(error.errors).map((item) => item.message),
        })
    }

    if (error.code === 11000) {
        return res.status(409).json({ message: 'A user with that email already exists' })
    }

    if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: 'Invalid user id' })
    }

    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
})

async function startServer() {
    if (!mongoUri) {
        throw new Error('MONGODB_URI is not set. Add it to backend/.env before starting the server.')
    }

    await mongoose.connect(mongoUri)
    app.listen(port, () => {
        console.log(`API listening on http://localhost:${port}`)
    })
}

if (require.main === module) {
    startServer().catch((error) => {
        console.error(error.message)
        process.exit(1)
    })
}

module.exports = app

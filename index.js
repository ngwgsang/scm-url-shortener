const express = require('express')
const { listen } = require('express/lib/application')
const app = express() 
const connectDB = require('./config/db')

connectDB()
app.use(express.json({extented: false }))
app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))


const PORT = 5000 
app.listen(PORT, () => console.log(`RUNNING ON PORT ${PORT}`))
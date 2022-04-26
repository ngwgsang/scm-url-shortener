const express = require("express")
const router = express.Router()
const validUrl = require('valid-url')
const shortid  = require('shortid')
const config = require('config')
// const { required } = require("nodemon/lib/config")
const Url = require('../models/Url')
// const { response } = require("express")


router.post('shorten', async (req,res) => {
    const { longUrl } = req.body
    const baseUrl = config.get('baseUrl')

    if (validUrl.isUri(baseUrl)){{
        return res.status(401).json('Invalid base Url') 
    }}
    
    const urlCode = shortid.generate()


    if (validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne( {longUrl} )


            if (url){
                res.json(url)
            }
            else{
                const shortUrl = baseUrl + '/' + urlCode

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })

                await url.save() 
                res.json(url)
            }

        } catch (error) {
            console.log(error.message)
            res.status(500).json('Server Error')
        }
    }
    else{
           res.status(401).json('Invalid Long Url')
    }

})

module.exports = router 

const express = require('express');
const router = express.Router();
const path = require('path');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');

const {Media} = require('../models');

router.post('/', (req, res) => {
    const file = req.body.file;

    if (!isBase64(file, {mimeRequired: true})) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Invalid base 64 file'
        });
    }

    base64Img.img(file, './public/media', Date.now(), async (err, filepath) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                code: 500,
                message: err.message || 'Cannot store the file'
            });
        }

        // '/public/media/file.png'
        console.log(filepath)
        const fileName = path.basename(filepath);

        const media = await Media.create({
            file: `media/${fileName}`
        });

        return res.json({
            status: 'success',
            code: 200,
            data: {
                id: media.id,
                file: media.file,
                url: `${req.protocol}://${req.get('host')}/${media.file}`
            }
        });
    });
});

module.exports = router;

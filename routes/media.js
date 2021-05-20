const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');

const {Media} = require('../models');
const {HOSTNAME} = process.env;

router.get('/', async (req, res) => {
    const media = await Media.findAll();

    return res.json({
        status: 'success',
        code: 200,
        data: media.map(item => {
            return {
                ...item.dataValues,
                url: `${HOSTNAME}/${item.file}`
            };
        })
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const media = await Media.findByPk(id);

    if (!media) {
        return res.status(404).json({
            status: 'not found',
            code: 404,
        });
    }

    media.dataValues.url = `${HOSTNAME}/${media.file}`;

    return res.json({
        status: 'success',
        code: 200,
        data: media
    });
});

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
                url: `${HOSTNAME}/${media.file}`
            }
        });
    });
});

router.delete('/:id', async (req, res) => {
    const media = await Media.findByPk(req.params.id);

    if (!media) {
        return res.status(404).json({
            status: 'not found',
            code: 404,
            message: 'Media not found'
        });
    }

    fs.unlink(`./public/${media.file}`, async (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                code: 500,
                message: err.message || 'Cannot delete media'
            });
        }

        await media.destroy();

        return res.json({
            status: 'success',
            code: 200,
            data: media
        });
    })

});

module.exports = router;

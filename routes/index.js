const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  return res.status(200).json({
    app: process.env.APP_NAME || 'Skillflare Media Service',
    code: 'media-service.skillflare',
    version: 'v1.0',
  });
});

module.exports = router;

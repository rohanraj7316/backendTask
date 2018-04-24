const express = require('express');


const authRoutes = require('./server/auth/auth.route');
const imageProcessRoutes = require('./server/image-processing/image-processing.route');
const jsonPatchRoute = require('./server/json-patch/json-patch.route');

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/', authRoutes);
router.use('/auth/image', imageProcessRoutes);
router.use('/auth/patch', jsonPatchRoute);


module.exports = router;
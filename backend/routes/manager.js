import express from 'express';
const router = express.Router();

// example route
router.get('/items', (req, res) => {
    res.send('Get all items');
});

export default router;
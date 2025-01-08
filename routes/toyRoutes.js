
const express = require('express');
const Toy = require('../models/Toy');
const router = express.Router();

//get all toys
router.get('/', async (req, res) => {
    try {
        const toys = await Toy.find();
        res.render('index', { toys }); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get form to add new toy
router.get('/add', (req, res) => {
    res.render('add');
});

//post
router.post('/', async (req, res) => {
    const toy = new Toy({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock
    });

    try {
        await toy.save();
        res.redirect('/toys');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//get
router.get('/edit/:id', async (req, res) => {
    try {
        const toy = await Toy.findById(req.params.id);
        if (!toy) return res.status(404).json({ message: 'Toy not found' });
        res.render('edit', { toy });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//put 
router.post('/edit/:id', async (req, res) => {
    try {
        const toy = await Toy.findById(req.params.id);
        if (!toy) return res.status(404).json({ message: 'Toy not found' });

        toy.name = req.body.name;
        toy.price = req.body.price;
        toy.description = req.body.description;
        toy.stock = req.body.stock;

        await toy.save();
        res.redirect('/toys');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete
// router.post('/delete/:name', async (req, res) => {
//     try {
//         const { name } = req.params;
//         const deleteToy = await Toy.findOneAndDelete({ name });
//         res.redirect('/toys');
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// DELETE a toy
router.post('/delete/:id', async (req, res) => {
    try {
        const toyId = req.params.id;
        const deletedToy = await Toy.findByIdAndDelete(toyId);
        
        if (!deletedToy) {
            return res.status(404).json({ message: 'Toy not found' });
        }

        res.redirect('/toys');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
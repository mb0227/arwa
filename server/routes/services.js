const express = require('express');
const router = express.Router();
const { db } = require('../firebaseConfig');
const { collection, getDocs, addDoc } = require('firebase/firestore');

// Get all services
router.get('/', async (req, res) => {
    try {
        const servicesCollection = collection(db, 'services');
        const servicesSnapshot = await getDocs(servicesCollection);
        const services = [];
        servicesSnapshot.forEach((doc) => {
            services.push({ id: doc.id, ...doc.data() });
        });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
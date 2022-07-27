const router = require('express').Router();
const sequelize = require('../config/connection');
const { Services, Provider, Comment } = require('../models');

// get all services for homepage
router.get('/', (req, res) => {
    console.log('======================');
    Services.findAll({
        attributes: [
            'id',
            'service_name',
            'cost',
            'service_category',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'services_id', 'provider_id', 'created_at'],
                include: {
                    model: Provider,
                    attributes: ['provider_name','provider_url','address']
                }
            },
            {
                model: Provider,
                attributes: ['provider_name','provider_url','address', 'address_city', 'address_state', 'address_zip']
            }
        ]
    })
        .then(dbServicesData => {
            const services = dbServicesData.map(services => services.get({ plain: true }));

            res.render('homepage', {
                services,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single services
router.get('/services/:id', (req, res) => {
    Services.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'service_name',
            'cost',
            'service_category',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'services_id', 'provider_id', 'created_at'],
                include: {
                    model: Provider,
                    attributes: ['provider_name','provider_url','address', 'address_city', 'address_state', 'address_zip']
                }
            },
            {
                model: Provider,
                attributes: ['provider_name','provider_url','address']
            }
        ]
    })
        .then(dbServicesData => {
            if (!dbServicesData) {
                res.status(404).json({ message: 'No services found with this id' });
                return;
            }

            const services = dbServicesData.get({ plain: true });

            res.render('single-services', {
                services,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Services, Provider, Comment, Vote } = require('../models');

// get all services for homepage
router.get('/', (req, res) => {
    console.log('======================');
    Services.findAll({
        attributes: [
            'id',
            'provider_url',
            'services',
            'cost',
            'service_type',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE services.id = vote.services_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'services_id', 'provider_id', 'created_at'],
                include: {
                    model: Provider,
                    attributes: ['provider_name']
                }
            },
            {
                model: Provider,
                attributes: ['provider_name']
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
            'provider_url',
            'title',
            'cost',
            'service_type',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE services.id = vote.services_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'services_id', 'provider_id', 'created_at'],
                include: {
                    model: Provider,
                    attributes: ['provider_name']
                }
            },
            {
                model: Provider,
                attributes: ['provider_name']
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

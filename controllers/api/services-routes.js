const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Services, Provider, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all services
router.get('/', (req, res) => {
    console.log('======================');
    Services.findAll({
        attributes: [
            'id',
            'service_name',
            'address',
            'service_category',
            'cost',
            'created_at',
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
                attributes: ['provider_name','provider_url','address', 'address_city', 'address_state', 'address_zip']
            }
        ]
    })
        .then(dbServicesData => res.json(dbServicesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Services.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'service_category',
            'cost',
            'service_name',
            'created_at'
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
            res.json(dbServicesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Services.create({
        service_name: req.body.service_name,
        service_category: req.body.service_category,
        cost: req.body.cost,
        provider_id: req.session.provider_id
    })
        .then(dbServicesData => res.json(dbServicesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Services.update(
        {
            service_name: req.body.service_name,
            cost: req.body.cost,
            service_category: req.body.service_category,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbServicesData => {
            if (!dbServicesData) {
                res.status(404).json({ message: 'No services found with this id' });
                return;
            }
            res.json(dbServicesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Services.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbServicesData => {
            if (!dbServicesData) {
                res.status(404).json({ message: 'No services found with this id' });
                return;
            }
            res.json(dbServicesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

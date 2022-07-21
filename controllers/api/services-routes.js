const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Services, Provider, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// get all providers
router.get('/', (req, res) => {
    console.log('======================');
    Services.findAll({
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
            'providfer_url',
            'service_type',
            'cost',
            'title',
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
            res.json(dbServicesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Services.create({
        title: req.body.title,
        provider_url: req.body.provider_url,
        service_type: req.body.service_type,
        cost: req.body.cost,
        provider_id: req.session.provider_id
    })
        .then(dbServicesData => res.json(dbServicesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/upvote', withAuth, (req, res) => {
    Services.upvote({ ...req.body, provider_id: req.session.provider_id }, { Vote, Comment, Provider })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Services.update(
        {
            title: req.body.title,
            provider_url: req.body.provider_url,
            cost: req.body.cost,
            service_type: req.body.service_type,
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

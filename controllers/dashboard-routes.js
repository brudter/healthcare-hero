const router = require("express").Router();
const sequelize = require("../config/connection");
const { Services, Provider, Comment, Vote } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", withAuth, (req, res) => {
router.get("/", (req, res) => {
  console.log(req.session);
  console.log("!!!!!!!!!!!!!!!!!!!!");
  Services.findAll({
    where: {
      provider_id: req.session.provider_id,
    },
    attributes: [
      "id",
      "service_name",
      "provider_url",
      "cost",
      "created_at",
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "services_id",
          "provider_id",
          "created_at",
        ],
        include: {
          model: Provider,
          attributes: ["provider_name"],
        },
      },
      {
        model: Provider,
        attributes: ["provider_name"],
      },
    ],
  })
          .then(dbServicesData => {
            const services = dbServicesData.map(services => services.get({ plain: true }));
            res.render('dashboard', { services, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.get('/edit/:id', withAuth, (req, res) => {
router.get('/edit/:id', (req, res) => {
    Services.findByPk(req.params.id, {
        attributes: [
            'id',
            'provider_url',
            'service_name',
            'cost',
            'service_category',
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
            if (dbServicesData) {
                const services = dbServicesData.get({ plain: true });

                res.render('edit-services', {
                    services,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;

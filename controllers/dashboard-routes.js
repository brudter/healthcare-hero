const router = require("express").Router();
const sequelize = require("../config/connection");
const { Services, Provider, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all services entered by logged-in provider
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
      "service_category",
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
          attributes: ["provider_name", "provider_url", "address",  'address_city', 'address_state', 'address_zip'],
        },
      },
      {
        model: Provider,
        attributes: ["provider_name", "provider_url", "address",  'address_city', 'address_state', 'address_zip'],
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

router.get('/edit/:id', (req, res) => {
    Services.findByPk(req.params.id, {
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
                    attributes: ['provider_name', 'provider_url', 'address']
                }
            },
            {
                model: Provider,
                attributes: ['provider_name','address']
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

const router = require('express').Router();
const { Provider, Services, Comment } = require('../../models');

// get all providers
router.get('/', (req, res) => {
    Provider.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbProviderData => res.json(dbProviderData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Provider.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Services,
                attributes: ['id', 'service_name', 'service_category', 'cost', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Services,
                    attributes: ['service_name']
                }
            },
        ]
    })
        .then(dbProviderData => {
            if (!dbProviderData) {
                res.status(404).json({ message: 'No provider found with this id' });
                return;
            }
            res.json(Provider);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Provider.create({
        provider_name: req.body.provider_name,
        provider_url: req.body.provider_url,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        address_city: req.body.address_city,
        address_state: req.body.address_state,
        address_zip: req.body.address_zip,
        specialization: req.body.specialization
    })
        .then(dbProviderData => {
            req.session.save(() => {
                req.session.provider_id = dbProviderData.id;
                req.session.provider_name = dbProviderData.provider_name;
                req.session.loggedIn = true;

                res.json(dbProviderData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    Provider.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbProviderData => {
        if (!dbProviderData) {
            res.status(400).json({ message: 'No provider with that email address!' });
            return;
        }

        const validPassword = dbProviderData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.provider_id = dbProviderData.id;
            req.session.provider_name = dbProviderData.provider_name;
            req.session.loggedIn = true;

            res.json({ provider: dbProviderData, message: 'You are now logged in!' });
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    Provider.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbProviderData => {
            if (!dbProviderData) {
                res.status(404).json({ message: 'No provider found with this id' });
                return;
            }
            res.json(dbProviderData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Provider.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbProviderData => {
            if (!dbProviderData) {
                res.status(404).json({ message: 'No provider found with this id' });
                return;
            }
            res.json(dbProviderData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

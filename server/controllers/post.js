const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = (req, res, next) => {
    delete req.body.userId;
    if (req.file) {
        const post = new Post({
            ...req.body,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })

        post.save().then(
            () => {
                res.status(201).json({
                    message: 'Le message a été enregistré avec succès !'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error.field
                });
            }
        );
    } else {
        const post =  new Post({
            ...req.body,
            userId: req.auth.userId,
        })
    
        post.save().then(
            () => {
                res.status(201).json({
                    message: 'Le message a été enregistré avec succès !'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error.field
                });
            }
        );
    }
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyPost = (req, res, next) => {
    delete req.body.userId;
    const newPost = req.file ? {
        ...req.body,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body,
        userId: req.auth.userId
    };

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                Post.updateOne({ _id: req.params.id }, { ...newPost, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Supprimé !'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAllPost = (req, res, next) => {
    Post.find().sort({_id:-1}).then(
        (posts) => {
            res.status(200).json(posts);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.likePost = (req, res, next) => {

    User.findByIdAndUpdate(
        req.body.id,
        { $addToSet: { likes: req.params.id } },
        { new: true },
        (err, result) => {
            if (err) return res.status(400).send(err);
        }
    )

    Post.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likers: req.body.id } },
        { new: true },
        (err, result) => {
            if (!err) return res.send(result)
            else return res.status(400).send(err)
        }
    );
};

exports.unLikePost = (req, res, next) => {

    User.findByIdAndUpdate(
        req.body.id,
        { $pull: { likes: req.params.id } },
        { new: true },
        (err, result) => {
            if (err) return res.status(400).send(err);
        }
    )

    Post.findByIdAndUpdate(
        req.params.id,
        { $pull: { likers: req.body.id } },
        { new: true },
        (err, result) => {
            if (!err) return res.send(result)
            else return res.status(400).send(err)
        }
    );
};
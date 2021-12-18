module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "The field first name can't be null"
                },
                notEmpty: {
                    args: true,
                    msg: "Please, write the actor's name"
                }
            }
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "The field last name can't be null"
                },
                notEmpty: {
                    args: true,
                    msg: "Please, write the actor's lastname"
                }
            }
        },
        rating: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "The field rating can't be null"
                },
                notEmpty: {
                    args: true,
                    msg: "Please, write the actor's rating"
                }
            }
        },
        favorite_movie_id: dataTypes.BIGINT(10).UNSIGNED
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Actor = sequelize.define(alias, cols, config); 

    Actor.associate = function (models) {
        Actor.belongsToMany(models.Movie, { // models.Movie -> Movies es el valor de alias en movie.js
            as: "movies",
            through: 'actor_movie',
            foreignKey: 'actor_id',
            otherKey: 'movie_id',
            timestamps: false
        })
    }

    return Actor
};
module.exports = (sequelize, Sequelize) => {
    const UserRabbitCard = sequelize.define("user_rabbitcards", {
        user_id: {
            type: Sequelize.INTEGER
        },
        t_id: {
            type: Sequelize.INTEGER
        },
        round: {
            type: Sequelize.INTEGER
        },
        notification: {
            type: Sequelize.BOOLEAN,
            default : false
        },
        tie_feet: {
            type: Sequelize.INTEGER,
        },
        tie_inches: {
            type: Sequelize.INTEGER,
        },
        tie_inches: {
            type: Sequelize.INTEGER,
        },
        state: {
            type: Sequelize.INTEGER,
        },
        winner_state: {
            type: Sequelize.BOOLEAN,
        },

    });

    return UserRabbitCard
}
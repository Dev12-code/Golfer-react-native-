module.exports = (sequelize, Sequelize) => {
    const Cttp_pick = sequelize.define("user_pick_cttp", {
        user_id: {
            type: Sequelize.INTEGER
        },
        cttp_id: {
            type: Sequelize.INTEGER
        }
    });

    return Cttp_pick
}
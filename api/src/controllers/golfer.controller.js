const db = require("../config/database");

exports.listAllGolfers = async (req, res) => {
    const response = await db.query(`SELECT * FROM golfers a 
    INNER JOIN (SELECT b.rank, b.prev_rank, c.* FROM worldgolfrankings b 
        INNER JOIN golfer_stats c ON b.p_id = c.p_id and b.year = 2021) b
    ON a.p_id = b.p_id AND b.year = 2021
    WHERE year = 2021
    ORDER BY b.rank`);
    res.status(200).send(response.rows);
}

exports.FindGolferByID = async (req, res) => {
    const p_id = parseInt(req.params.p_id);
    const  response = await db.query(`SELECT * FROM golfers a INNER JOIN golfer_stats b ON a.p_id = b.p_id WHERE a.p_id = $1`, [p_id]);
    res.status(200).send(response.rows);
}

exports.listGolfersByField = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const response = await db.query(`SELECT * FROM tournament_field a
    INNER JOIN (SELECT a.*, b.rank FROM golfers a INNER JOIN worldgolfrankings b
    ON a.p_id = b.p_id WHERE year = 2021) c ON a.p_id = c.p_id WHERE
    a.t_id = $1 ORDER BY c.rank`, [t_id]);
    res.status(200).send(response.rows);
}

exports.listGroupingsbyGolfer = async (req, res) => {
    const p_id = parseInt(req.params.p_id);
    const response = await db.query(`SELECT * FROM groupings a INNER JOIN (SELECT group_id, round, t_id FROM groupings
                                    WHERE p_id = $1) b ON a.t_id = b.t_id AND a.round = b.round AND a.group_id = b.group_id`, [p_id]);
    res.status(200).send(response.rows);   
}

exports.playerProfile = async (req, res) => {
    const p_id = parseInt(req.params.p_id);
    const response = await db.query(`select *,
                                    b.birdie_conversion, b.bc_rank, b.driving_accuracy, b.da_rank, b.approach_150175, b.a150_rank, b.approach_175200, b.a175_rank,
                                    c.rank
                                    from golfers a, golfer_stats b, worldgolfrankings c
                                    where a.p_id = $1 and a.p_id = b.p_id
                                    and a.p_id = c.p_id`, [p_id]);
    res.status(200).send(response.rows);
}
exports.playerStats = async (req, res) => {
    const p_id = parseInt(req.params.p_id);
    const response = await db.query(`SELECT * FROM golfer_stats WHERE p_id = $1`, [p_id]);
    res.status(200).send(response.rows);
}
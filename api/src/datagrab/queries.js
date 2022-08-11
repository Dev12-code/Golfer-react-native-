//move to production environment
const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database: 'pga',
//     password: 'password',
//     port: 5432,
// })
const pool = new Pool({
  user: "postgres",
  password: "root@123",
  database: "postgres",
  port: "5432",
  host: "api.rabbitcards.com",
  ssl: true
});
// switch to graphql at some point

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.stats(200).json(results.rows)
    })
}

const getGolfers = function(request, response) {
    pool.query('SELECT name FROM golfers  ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        golfers1 = JSON.stringify(results.rows)
        response.render('golfers', { golfers: golfers1})
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getGolferById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM golfers WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}

const createGolfer = (golfer) => {
  
    pool.query('INSERT INTO golfers (p_id, first_name, last_name, country) VALUES ($1, $2, $3, $4) ON CONFLICT ON CONSTRAINT (p_id) DO NOTHING', [golfer.p_id, golfer.first_name, golfer.last_name, golfer.country], (error, results) => {
      if (error) {
        throw error
      }
      console.log(`Golfer added with ID: ${results.p_id}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const updateGolfer = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body
  
    pool.query(
      'UPDATE golfers SET name = $1 WHERE id = $3',
      [name, id],
      (error, results) => {
        if (error) {
          throw error
        }
        console.log(`Golfer modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  const deleteGolfer = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM golfers WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Golfer deleted with ID: ${id}`)
    })
  }

  module.exports = {
      getUsers,
      getUserById,
      createUser,
      updateUser,
      deleteUser,
      getGolfers,
      getGolferById,
      createGolfer,
      updateGolfer,
      deleteGolfer,
  }
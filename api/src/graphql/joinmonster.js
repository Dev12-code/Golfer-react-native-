const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const graphql = require('graphql')
const joinMonster = require('join-monster')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'pga',
    password: 'password',
    port: 5432,
})

const Golfer = new graphql.GraphQLObjectType({
    name: "Golfer",
    extensions: {
        joinMonster: {
            sqlTable: 'golfers',
            uniqueKey: 'p_id',
        }
    },
    fields: () => ({
        p_id: {
            type: graphql.GraphQLString,
            sqlColumn: 'p_id'    
            
        },
        first_name: {
            type: graphql.GraphQLString,
            sqlColumn: 'first_name'                
            
        },
        last_name: {
            type: graphql.GraphQLString,
            sqlColumn: 'last_name'                
            
        },
        country: {
            type: graphql.GraphQLString,
            sqlColumn: 'country'                
            
        },
        won: {
            type: graphql.GraphQLList(Winner),
            extensions: {
                joinMonster: {
                    sqlBatch: {
                        thisKey: 'p_id',
                        parentKey: 'p_id'
                    },
                }
            }
        }
    
    })
});

const Tournament = new graphql.GraphQLObjectType({
    name: "Tournament",
    extensions: {
        joinMonster: {
            sqlTable: 'tournaments_completed',
            uniqueKey: 't_id',
        }
    },
    fields: () => ({
        t_id: {
            type: graphql.GraphQLString,
            sqlColumn: 't_id'    
            
        },
        name: {
            type: graphql.GraphQLString,
            sqlColumn: 'name'                
            
        },
        season: {
            type: graphql.GraphQLInt,
            sqlColumn: 'season'                
            
        },
        sequence_number: {
            type: graphql.GraphQLInt,
            sqlColumn: 'sequence_number'                
            
        },
        start_date: {
            type: graphql.GraphQLString,
            sqlColumn: 'start_date'                
            
        },
        end_date: {
            type: graphql.GraphQLString,
            sqlColumn: 'end_date'                
            
        },
        purse: {
            type: graphql.GraphQLInt,
            sqlColumn: 'purse'                
            
        },
        completed: {
            type: graphql.GraphQLBoolean,
            sqlColumn: 'completed'                
            
        },
        course: {
            type: graphql.GraphQLList(Host),
            extensions: {
                joinMonster: {
                    sqlBatch: {
                        thisKey: 't_id',
                        parentKey: 't_id'
                    },
                }
            }
        },
        field: {
            type: graphql.GraphQLList(Field),
            extensions: {
                joinMonster: {
                    sqlBatch: {
                        thisKey: 't_id',
                        parentKey: 't_id'
                    }
                }
            }
        },
        leaderboard: {
            type: graphql.GraphQLList(Leaderboard),
            extensions: {
                joinMonster: {
                    sqlBatch: {
                        thisKey: 't_id',
                        parentKey: 't_id'
                    }
                }
            } 
        }
    })
});

const Host = new graphql.GraphQLObjectType({
    name: "Host",
    extensions: {
        joinMonster: {
            sqlTable: 'tournament_hosts',
            uniqueKey: 'id'
        }
    },
    fields: () => ({
        id: {
            type: graphql.GraphQLString,
            sqlColumn: 'id'
        },
        t_id: {
            type: graphql.GraphQLString,
            sqlColumn: 't_id'
        },
        course_number: {
            type: graphql.GraphQLString,
            sqlColumn: 'course_number'
        },
        holes: {
            type: graphql.GraphQLList(Hole),
            extensions: {
                joinMonster: {
                    sqlJoin: (tournament_hostsTable, tournament_holesTable, args) =>
                    `${tournament_hostsTable}.t_id = ${tournament_holesTable}.t_id
                    AND ${tournament_hostsTable}.course_number = ${tournament_holesTable}.course_number`
                }
            }
        }
    })
})

const Winner = new graphql.GraphQLObjectType({
    name: "Winner",
    extensions: {
        joinMonster: {
            sqlTable: 'winners',
            uniqueKey: 'id',
        }
    },
    fields: () => ({
        id: {
            type: graphql.GraphQLString,
            sqlColumn: 'id'
        },
        t_id: {
            type: graphql.GraphQLString,
            sqlColumn: 't_id'
        },
        p_id: {
            type: graphql.GraphQLString,
            sqlColumn: 'p_id'
        },
        total_score: {
            type: graphql.GraphQLInt,
            sqlColumn: 'total_score'
        },
        money_earned: {
            type: graphql.GraphQLInt,
            sqlColumn: 'money_earned'
        },
        fedex_points_earned: {
            type: graphql.GraphQLInt,
            sqlColumn: 'fedex_points_earned'
        },
        tournament: {
            type: Tournament,
            extensions: {
                joinMonster: {
                    sqlBatch: {
                        thisKey: 't_id',
                        parentKey: 't_id'
                    },
                }
            }
        }
    })
})

const Hole = new graphql.GraphQLObjectType({
    name: "Hole",
    extensions: {
        joinMonster: {
            sqlTable: 'tournament_holes',
            uniqueKey: 'id',
        }
    },
    fields: () => ({
        id: {
            type: graphql.GraphQLString,
            sqlColumn: 'id'
        },
        t_id: {
            type: graphql.GraphQLString,
            sqlColumn: 't_id'    
            
        },
        course_number: {
            type: graphql.GraphQLInt,
            sqlColumn: 'course_number'                
            
        },
        hole_number: {
            type: graphql.GraphQLInt,
            sqlColumn: 'hole_number'                
            
        },
        par: {
            type: graphql.GraphQLInt,
            sqlColumn: 'par'                
            
        },
        yardage: {
            type: graphql.GraphQLInt,
            sqlColumn: 'yardage'                
            
        },
    
    })
});

const Course = new graphql.GraphQLObjectType({
    name: "Course",
    extensions: {
        joinMonster: {
            sqlTable: 'courses',
            uniqueKey: 'course_number',
        }
    },
    fields: () => ({
        course_number: {
            type: graphql.GraphQLString,
            sqlColumn: 'course_number'    
            
        },
        name: {
            type: graphql.GraphQLString,
            sqlColumn: 'name'                
            
        },
        location: {
            type: graphql.GraphQLString,
            sqlColumn: 'location'                
            
        },
        par_value: {
            type: graphql.GraphQLInt,
            sqlColumn: 'par_value'                
            
        },
        total_yardage: {
            type: graphql.GraphQLInt,
            sqlColumn: 'total_yardage'                
            
        },
        holes: {
            description: "Holes on this course",
            type: new graphql.GraphQLList(Hole),
            extensions: {
                joinMonster: {
                    sqlBatch: {
                        thisKey: 'course_number',
                        parentKey: 'course_number'
                    },
                }
            }
        }
    })
});

const Field = new graphql.GraphQLObjectType({
    name: 'Field',
    extensions: {
        joinMonster: {
            sqlTable: 'tournament_field',
            uniqueKey: 'id',
        }
    },
    fields: () => ({
        id: {
            type: graphql.GraphQLString,
            sqlColumn: 'id'
        },
        t_id: {
            type: graphql.GraphQLString,
            sqlColumn: 't_id'
        },
        p_id: {
            type: graphql.GraphQLString,
            sqlColumn: 'p_id'
        }
    })
})

const Grouping = new graphql.GraphQLObjectType({
    name: 'Grouping',
    extensions: {
        joinMonster: {
            sqlTable: 'groupings',
            uniqueKey: 'id',
        }
    },
    fields: () => ({
        id: {
            type: graphql.GraphQLString,
            sqlColumn: 'id'
        },
        group_id: {
            type: graphql.GraphQLString,
            sqlColumn: 'group_id'
        },
        t_id: {
            type: graphql.GraphQLString,
            sqlColumn: 't_id'
        },
        p_id: {
            type: graphql.GraphQLString,
            sqlColumn: 'p_id'
        },
        round: {
            type: graphql.GraphQLString,
            sqlColumn: 'round'
        },
        tee_time: {
            type: graphql.GraphQLString,
            sqlColumn: 'tee_time'
        }
    })
})

const Leaderboard = new graphql.GraphQLObjectType({
    name: 'Leaderboard',
    extensions: {
        joinMonster: {
            sqlTable: 'scoreboard',
            uniqueKey: 'id',
        }
    },
    fields: () => ({
        id: {
            type: graphql.GraphQLString,
            sqlColumn: 'id'
        },
        t_id: {
            type: graphql.GraphQLString,
            sqlColumn: 't_id'
        },
        p_id: {
            type: graphql.GraphQLString,
            sqlColumn: 'p_id'
        },
        round: {
            type: graphql.GraphQLString,
            sqlColumn: 'round'
        },
        status: {
            type: graphql.GraphQLString,
            sqlColumn: 'status'
        },
        start_hole: {
            type: graphql.GraphQLString,
            sqlColumn: 'start_hole'
        },
        group_id: {
            type: graphql.GraphQLString,
            sqlColumn: 'group_id' 
        },
        position: {
            type: graphql.GraphQLString,
            sqlColumn: 'position'
        },
        total: {
            type: graphql.GraphQLString,
            sqlColumn: 'total'
        },
        today: {
            type: graphql.GraphQLString,
            sqlColumn: 'today'
        },
        thru: {
            type: graphql.GraphQLString,
            sqlColumn: 'start_hole'
        }
    })
})

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      hello: {
        type: graphql.GraphQLString,
        resolve: () => "Hello world!"
      },
      golfers: {
        type: new graphql.GraphQLList(Golfer),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }
      },
      golfer: {
        type: Golfer,
        args: { p_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }, 
                },
        extensions: {
            joinMonster: {
                where: (golfersTable, args, context) => {
                    return `${golfersTable}.p_id = ${args.p_id}`
                }
            }
        },
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }

      },
      tournaments: {
        type: new graphql.GraphQLList(Tournament),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }
      },
      tournament: {
        type: Tournament,
        args: { t_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
                 },
        extensions: {
            joinMonster: {
                where: (tournaments_completedTable, args, context) => {
                    return `${tournaments_completedTable}.t_id = ${args.t_id}`
                }
            }
        },
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }

      },
      courses: {
        type: new graphql.GraphQLList(Course),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }
      },
      course: {
        type: Course,
        args: { course_number: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }, },
        extensions: {
            joinMonster: {
                where: (coursesTable, args, context) => {
                    return `${coursesTable}.course_number = ${args.course_number}`
                }
            }
        },
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }

      },
      holes: {
        type: new graphql.GraphQLList(Hole),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }
      },
      hosts: {
        type: new graphql.GraphQLList(Host),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }
      },
      winners: {
        type: new graphql.GraphQLList(Winner),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }
      },
      fields: {
        type: new graphql.GraphQLList(Field),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }
      },
      groupings: {
        type: new graphql.GraphQLList(Grouping),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }
      },
      grouping: {
        type: graphql.GraphQLList(Grouping),
        args: { t_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }, 
                round: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }, 
                group_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }, },
        extensions: {
            joinMonster: {
                where: (groupingsTable, args, context) => {
                    return `${groupingsTable}.t_id = ${args.t_id} AND ${groupingsTable}.round = ${args.round} AND ${groupingsTable}.group_id = ${args.group_id}`
                }
            }
        },
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }

      },
      leaderboards: {
        type: new graphql.GraphQLList(Leaderboard),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }  
      },
      leaderboard: {
        type: graphql.GraphQLList(Leaderboard),
        args: { t_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }, },
        extensions: {
            joinMonster: {
                where: (scoreboardTable, args, context) => {
                    return `${scoreboardTable}.t_id = ${args.t_id}`
                }
            }
        },
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return pool.query(sql)
            })
        }
      }
    })
  })
      
  const schema = new graphql.GraphQLSchema({ query: QueryRoot });
 
  const app = express();
  app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));
  app.listen(4000, () => {
      console.log("Running, babay")
  });
CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR (255),
password VARCHAR (255),
first_name VARCHAR (255),
last_name VARCHAR (255),
reset_password_token VARCHAR (255),
device_token VARCHAR(5000),
createdAt TIMESTAMP,
updatedAt TIMESTAMP
);

CREATE TABLE roles (
id SERIAL PRIMARY KEY,
name VARCHAR (255),
createdAt TIMESTAMP,
updatedAt TIMESTAMP
);

CREATE TABLE user_roles (
id SERIAL PRIMARY KEY,
user_id INT,
role_id INT,
createdAt TIMESTAMP,
updatedAt TIMESTAMP,
FOREIGN KEY (user_id) 
    REFERENCES users (id),
FOREIGN KEY (role_id) 
    REFERENCES roles (id)
);

CREATE TABLE courses (
    course_number INT PRIMARY KEY,
    name VARCHAR (255),
    location VARCHAR (255),
    par_value INT,
    total_yardage INT
);

CREATE TABLE golfers (
    p_id INT PRIMARY KEY,
    first_name VARCHAR (255),
    middle_name VARCHAR (255),
    last_name VARCHAR (255),
    nick_name VARCHAR (255),
    height VARCHAR (255),
    weight INT,
    birthdate VARCHAR (255),
    birthplace VARCHAR (255),
    country VARCHAR (255),
    tour_winnings VARCHAR (255),
    current_season_highlight VARCHAR (1000),
    special_interests VARCHAR (255),
    fun_fact VARCHAR (255)
);

CREATE TABLE tournaments_completed (
    t_id INT PRIMARY KEY,
    name VARCHAR (255),
    season INT,
    played_year INT,
    sequence_number INT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    purse INT,
    completed BOOLEAN
);

CREATE TABLE winners (
    id SERIAL PRIMARY KEY,
    t_id INT,
    p_id INT,
    total_score INT,
    money_earned INT,
    fedex_points_earned INT,
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id),
    FOREIGN KEY (p_id)
        REFERENCES golfers (p_id)
);

CREATE TABLE groupings (
    id SERIAL PRIMARY KEY,
    group_id INT,
    t_id INT,
    p_id INT,
    round INT,
    tee_time TIMESTAMP,
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id),
    FOREIGN KEY (p_id)
        REFERENCES golfers (p_id)
);

CREATE TABLE tournament_hosts (
    t_id INT,
    course_number INT,
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id),
    FOREIGN KEY (course_number)
        REFERENCES courses (course_number)
);

CREATE TABLE tournament_holes (
    hole_number INT,
    t_id INT,
    course_number INT,
    par INT,
    yardage INT,
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id),
    FOREIGN KEY (course_number)
        REFERENCES courses (course_number)
);

CREATE TABLE scoreboard (
    id SERIAL PRIMARY KEY,
    t_id INT,
    p_id INT,
    round INT,
    status VARCHAR (255),
    start_hole INT,
    group_id INT,
    position VARCHAR (255),
    total VARCHAR (255),
    today VARCHAR (255),
    thru VARCHAR (255),
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id),
    FOREIGN KEY (p_id)
        REFERENCES golfers (p_id)
);

CREATE TABLE scorecards (
    id SERIAL PRIMARY KEY,
    t_id INT,
    p_id INT,
    round INT,
    thru VARCHAR (255),
    hole_number INT,
    par INT,
    strokes INT,
    status VARCHAR (255),
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id),
    FOREIGN KEY (p_id)
        REFERENCES golfers (p_id)
);

CREATE TABLE tournament_field (
    id SERIAL PRIMARY KEY,
    t_id INT,
    p_id INT,
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id),
    FOREIGN KEY (p_id)
        REFERENCES golfers (p_id)
);

CREATE TABLE worldgolfrankings (
    id SERIAL PRIMARY KEY,
    p_id INT,
    rank INT,
    year INT,
    prev_rank INT,
    FOREIGN KEY (p_id)
       REFERENCES golfers (p_id)   
);

CREATE TABLE cttp (
    id SERIAL PRIMARY KEY,
    t_id INT,
    g_id INT,
    p_id INT,
    round INT,
    hole INT,
    group_id INT,
    won BOOLEAN,
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id),
    FOREIGN KEY (g_id)
        REFERENCES groupings (id),
    FOREIGN KEY (p_id)
        REFERENCES golfers (p_id)
);

CREATE TABLE user_pick_cttps (
    id SERIAL PRIMARY KEY,
    user_id INT,
    cttp_id INT,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users (id),
    FOREIGN KEY (cttp_id)
        REFERENCES cttp (id) 
); 

CREATE TABLE rabbitcard_rankings (
    id SERIAL PRIMARY KEY,
    user_id INT,
    t_id INT,
    score INT,
    FOREIGN KEY (user_id)
        REFERENCES users (id),
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id)
);

CREATE TABLE golfer_stats (
    p_id INT,
    driving_accuracy VARCHAR ( 255 ),
    da_rank INT,
    approach_100125 VARCHAR ( 255 ),
    a100_rank INT,
    approach _125150 VARCHAR ( 255 ),
    a125_rank INT,
    approach_150175 VARCHAR ( 255 ),
    a150_rank INT,
    approach_175200 VARCHAR ( 255 ),
    a175_rank INT,
    approach_200 VARCHAR ( 255 ),
    a200_rank INT,
    putting_perc VARCHAR ( 255 ),
    pp_rank INT,
    overall INT,
    createdAt TIMESTAMP,
    FOREIGN KEY (p_id)
        REFERENCES golfers (p_id)
);

CREATE TABLE cttp_results (
    p_id INT,
    t_id INT,
    round INT,
    hole INT,
    distance DOUBLE PRECISION,
    FOREIGN KEY (p_id)
        REFERENCES golfers (p_id),
    FOREIGN KEY (t_id)
        REFERENCES tournaments_completed (t_id)
);
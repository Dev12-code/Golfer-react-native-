/* Replace with your SQL commands */
/* Replace with your SQL commands */
-- Table: public.golfers

-- DROP TABLE IF EXISTS public.golfers;

CREATE TABLE IF NOT EXISTS public.test
(
    p_id integer NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default",
    last_name character varying(255) COLLATE pg_catalog."default",
    country character varying(255) COLLATE pg_catalog."default",
    middle_name VARCHAR (255),
    nick_name VARCHAR (255),
    height VARCHAR (255),
    weight INT,
    birthdate VARCHAR (255),
    birthplace VARCHAR (255),
    tour_winnings VARCHAR (255),
    current_season_highlight VARCHAR (1000),
    special_interests VARCHAR (255),
    fun_fact VARCHAR (255)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.test
    OWNER to postgres;
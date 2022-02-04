STEP 1 : setup postgresql using pgadmin4 application
  ->create a database with name testApp
  ->right click on database and select query tool.
  ->Enter following SQL script in query tool.

  CREATE TABLE public.users(
      user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
      password character varying(100) COLLATE pg_catalog."default" NOT NULL,
      user_file jsonb,
      last_updated timestamp without time zone,
      CONSTRAINT users_pkey PRIMARY KEY (user_name)
  )

  TABLESPACE pg_default;
  ALTER TABLE public.users
        OWNER to postgres;


By default application uses following details to connect to postgres
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    port:'5432',
    database:'testApp',
    password:'postgres'
})

if you want to change any of these settings, please do it in db/model.js file.


that's all. your db is setup.


step2 : open command prompt in root folder and Install node modules using "npm i" command
step3 : run 'node app.js'

that's it. application should be running on "http://localhost:3001";



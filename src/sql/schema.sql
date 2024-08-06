-- DROP ALL POLICIES
DROP POLICY IF EXISTS "CRUD on lotteries." ON lotteries;
DROP POLICY IF EXISTS "CRUD on draws." ON draws;
DROP POLICY IF EXISTS "CRUD on raffles." ON raffles;
DROP POLICY IF EXISTS "CRUD on raffle prizes." ON prizes;
DROP POLICY IF EXISTS "CRUD on buyers." ON buyers;
DROP POLICY IF EXISTS "CRUD on sellers." ON sellers;
DROP POLICY IF EXISTS "CRUD on raffle sellers." ON raffles_sellers;
DROP POLICY IF EXISTS "CRUD on tickets pulls." ON tickets_pulls;
DROP POLICY IF EXISTS "CRUD on raffle tickets." ON tickets;

-- DROP ALL TABLES
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS tickets_pulls;
DROP TABLE IF EXISTS buyers;
DROP TABLE IF EXISTS raffles_sellers;
DROP TABLE IF EXISTS sellers;
DROP TABLE IF EXISTS prizes;
DROP TABLE IF EXISTS raffles;
DROP TABLE IF EXISTS draws;
DROP TABLE IF EXISTS lotteries;

-- CREATE TABLES;
CREATE TABLE lotteries (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  image_path VARCHAR,
  thumb_hash VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE draws (
  id SERIAL PRIMARY KEY,
  lottery_id INTEGER REFERENCES lotteries(id) NOT NULL,
  name VARCHAR NOT NULL,
  winning_number VARCHAR,
  drawn_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE raffles (
  id SERIAL PRIMARY KEY,
  draw_id INTEGER REFERENCES draws(id) NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  image_path VARCHAR,
  thumb_hash VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE prizes (
  id SERIAL PRIMARY KEY,
  raffle_id INTEGER REFERENCES raffles(id) NOT NULL,
  name VARCHAR NOT NULL,
  prize_value NUMERIC DEFAULT 0,
  image_path VARCHAR,
  thumb_hash VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE sellers (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR,
  phone VARCHAR,
  avatar_url VARCHAR,
  thumb_hash VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE raffles_sellers (
  id SERIAL PRIMARY KEY,
  raffle_id INTEGER REFERENCES raffles(id) NOT NULL,
  seller_id INTEGER REFERENCES sellers(id) NOT NULL,
  ticket_price NUMERIC DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE (raffle_id, seller_id)
);

CREATE TABLE buyers (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR,
  phone VARCHAR,
  avatar_url VARCHAR,
  thumb_hash VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE tickets_pulls (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  raffle_id INTEGER REFERENCES raffles(id) NOT NULL,
  buyer_id INTEGER REFERENCES buyers(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  number VARCHAR NOT NULL,
  raffle_id INTEGER REFERENCES raffles(id) NOT NULL,
  buyer_id INTEGER REFERENCES buyers(id),
  seller_id INTEGER REFERENCES sellers(id),
  pull_id INTEGER REFERENCES tickets_pulls(id),
  price NUMERIC DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE (number, raffle_id)
);

-- ENABLE ROW LEVEL SECURITY;
ALTER TABLE lotteries ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE raffles_sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets_pulls ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- CREATE ROW LEVEL SECURITY POLICIES (for all to authenticated users);
create policy "CRUD on lotteries." on lotteries for all to authenticated using (true);
create policy "CRUD on draws." on draws for all to authenticated using (true);
create policy "CRUD on raffles." on raffles for all to authenticated using (true);
create policy "CRUD on raffle prizes." on prizes for all to authenticated using (true);
create policy "CRUD on buyers." on buyers for all to authenticated using (true);
create policy "CRUD on sellers." on sellers for all to authenticated using (true);
create policy "CRUD on raffle sellers." on raffles_sellers for all to authenticated using (true);
create policy "CRUD on tickets pulls." on tickets_pulls for all to authenticated using (true);
create policy "CRUD on raffle tickets." on tickets for all to authenticated using (true);

-- SEED DATA;
INSERT INTO lotteries (name, description, image_path, thumb_hash) VALUES
  ('Baloto', '', NULL, NULL),
  ('Lotería de Bogotá', '', NULL, NULL),
  ('Lotería de Medellín', '', NULL, NULL),
  ('Lotería del Valle', '', NULL, NULL),
  ('Lotería del Cauca', '', NULL, NULL),
  ('Lotería de Boyacá', '', NULL, NULL);

INSERT INTO sellers (name, email, phone, avatar_url, thumb_hash) VALUES
  ('juan carlos sanchez','','3222885970',NULL, NULL),
  ('javier sanchez','','1234567890',NULL, NULL),
  ('fernando salinas','','3103453989',NULL, NULL),
  ('alfonso suarez','','3114904740',NULL, NULL),
  ('diego arellano','','3204931321',NULL, NULL),
  ('julio alfonzo','','3112024256',NULL, NULL),
  ('jorge riaño','','3107039135',NULL, NULL),
  ('hernando santamaria','','3052846277',NULL, NULL),
  ('remache','','3114940686',NULL, NULL),
  ('cristina dolly','','3118544862',NULL, NULL),
  ('javier otalora','','3133397926',NULL, NULL),
  ('manpora','','3184338163',NULL, NULL),
  ('juan sanchez','','3213960821',NULL, NULL),
  ('coronel gomez','','3214537585',NULL, NULL),
  ('varguitas','','3057208570',NULL, NULL),
  ('dorian vargas','','3132537191',NULL, NULL),
  ('marisol abastos','','3208187894',NULL, NULL),
  ('w','','3115632277',NULL, NULL),
  ('pastuso','','3104769439',NULL, NULL),
  ('angel carvajal','','3132501104',NULL, NULL),
  ('tatu','','3134709711',NULL, NULL),
  ('carlos mario','','3227634865',NULL, NULL),
  ('luis novoa','','3103126312',NULL, NULL),
  ('nepo silva','','3124947160',NULL, NULL),
  ('roberto pimiento','','3193264887',NULL, NULL),
  ('maximino tello','','3108088693',NULL, NULL),
  ('camilo aranda','','3124565159',NULL, NULL),
  ('niche','','3185851478',NULL, NULL),
  ('carlos santos','','3107865378',NULL, NULL),
  ('puin','','3213694908',NULL, NULL),
  ('jharbel tarzan','','3134314400',NULL, NULL),
  ('david gomez','','3132602074',NULL, NULL),
  ('german vejarano','','3002176938',NULL, NULL),
  ('carevaca','','3124558495',NULL, NULL),
  ('cesar carevaca','','3013830490',NULL, NULL),
  ('juanito','','3222885970',NULL, NULL),
  ('lina muñoz','','3229099526',NULL, NULL),
  ('jenner avila','','3118741046',NULL, NULL),
  ('johana hernandez','','3105608814',NULL, NULL),
  ('alex manzano','','3118342685',NULL, NULL),
  ('jairo murcia','','3118136646',NULL, NULL),
  ('cleiman blanco','','3103220099',NULL, NULL);

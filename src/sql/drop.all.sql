-- DROP ALL VIEWS
DROP VIEW IF EXISTS sellers_with_tickets_count;
DROP VIEW IF EXISTS sellers_with_tickets_count_by_raffle;
DROP VIEW IF EXISTS sellers_by_raffle;
DROP VIEW IF EXISTS raffle_stats;

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

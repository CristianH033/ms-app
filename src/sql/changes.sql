-- DROP ALL POLICIES
DROP POLICY IF EXISTS "CRUD on app_changes." ON app_changes;

-- DROP ALL TABLES
DROP TABLE IF EXISTS app_changes;

-- CREATE TABLES;
CREATE TABLE app_changes (
  id SERIAL PRIMARY KEY,
  uid VARCHAR NOT NULL,
  description TEXT,
  value JSONB NOT NULL,
  applied BOOLEAN,
  applied_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_changes ENABLE ROW LEVEL SECURITY;

-- CREATE ROW LEVEL SECURITY POLICIES (for all to authenticated users);
create policy "CRUD on app_changes." on app_changes for all to authenticated using (true);

-- SEED DATA;
INSERT INTO app_changes (uid, description, value, applied, applied_at) VALUES
  ('test', 'test', '{"table": "lotteries", "changes": {"old": {"column1": "test"}, "new": {"column1": "test"}}}', true, '2022-10-01 00:00:00');

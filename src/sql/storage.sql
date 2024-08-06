-- DROP ALL
DROP POLICY IF EXISTS "Select objects in bucket 'avatars'." ON storage.objects;
DROP POLICY IF EXISTS "Insert objects in bucket 'avatars'." ON storage.objects;
DROP POLICY IF EXISTS "Update objects in bucket 'avatars'." ON storage.objects;

DROP POLICY IF EXISTS "Select objects in bucket 'covers'." ON storage.objects;
DROP POLICY IF EXISTS "Insert objects in bucket 'covers'." ON storage.objects;
DROP POLICY IF EXISTS "Update objects in bucket 'covers'." ON storage.objects;

delete from storage.objects where bucket_id = 'avatars';
delete from storage.objects where bucket_id = 'covers';
delete from storage.buckets where id = 'avatars';
delete from storage.buckets where id = 'covers';

-- BUCKETS
insert into storage.buckets
  (id, name, public)
values
  ('avatars', 'avatars', false);

insert into storage.buckets
  (id, name, public)
values
  ('covers', 'covers', false);

-- POLICIES
CREATE POLICY "Select objects in bucket 'avatars'." ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'avatars');
CREATE POLICY "Insert objects in bucket 'avatars'." ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Update objects in bucket 'avatars'." ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'avatars');

CREATE POLICY "Select objects in bucket 'covers'." ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'covers');
CREATE POLICY "Insert objects in bucket 'covers'." ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'covers');
CREATE POLICY "Update objects in bucket 'covers'." ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'covers');

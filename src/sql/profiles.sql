-- DROP TRIGGERS
DROP TRIGGER on_auth_user_created ON auth.users;
DROP TRIGGER on_profile_updated ON public.profiles;

-- DROP FUNCTIONS
DROP FUNCTION IF EXISTS public.handle_new_user;
DROP FUNCTION IF EXISTS public.update_user_metadata;
DROP FUNCTION IF EXISTS public.sync_user_profiles;

-- DROP POLICIES
DROP POLICY IF EXISTS "CRUD on profiles." ON public.profiles;

-- DROP PROFILES TABLE
DROP TABLE IF EXISTS public.profiles;

-- CREATE USERS PROFILES
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  image_path TEXT,
  thumb_hash TEXT,
  PRIMARY KEY (id)
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- CREATE POLICIES
create policy "CRUD on profiles." on profiles for all to authenticated using (true);

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name, image_path, thumb_hash)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name', new.raw_user_meta_data ->> 'image_path', new.raw_user_meta_data ->> 'thumb_hash');
  return new;
end;
$$;

-- UPDATE USER METADATA
CREATE OR REPLACE FUNCTION public.update_user_metadata()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Actualiza la tabla auth.users con los valores proporcionados, manejando NULL correctamente
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    jsonb_set(
      jsonb_set(
        jsonb_set(
          COALESCE(raw_user_meta_data, '{}'::jsonb),
          '{first_name}', to_jsonb(COALESCE(NEW.first_name, '')), true
        ),
        '{last_name}', to_jsonb(COALESCE(NEW.last_name, '')), true
      ),
      '{image_path}', to_jsonb(COALESCE(NEW.image_path, '')), true
    ),
    '{thumb_hash}', to_jsonb(COALESCE(NEW.thumb_hash, '')), true
  )
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;

-- SYNC USER PROFILES
CREATE OR REPLACE FUNCTION public.sync_user_profiles()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    user_record RECORD;
    profile_record RECORD;
BEGIN
    -- Sync profiles from auth.users
    FOR user_record IN SELECT id, raw_user_meta_data FROM auth.users
    LOOP
        -- Check if the profile exists
        IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = user_record.id) THEN
            -- Insert the profile if it doesn't exist
            INSERT INTO public.profiles (id, first_name, last_name, image_path)
            VALUES (
                user_record.id,
                user_record.raw_user_meta_data::jsonb ->> 'first_name',
                user_record.raw_user_meta_data::jsonb ->> 'last_name',
                user_record.raw_user_meta_data::jsonb ->> 'image_path',
                user_record.raw_user_meta_data::jsonb ->> 'thumb_hash'
            );
        ELSE
            -- Update the profile if it exists
            UPDATE public.profiles
            SET
                first_name = COALESCE(NULLIF(user_record.raw_user_meta_data::jsonb ->> 'first_name', ''), first_name),
                last_name = COALESCE(NULLIF(user_record.raw_user_meta_data::jsonb ->> 'last_name', ''), last_name),
                image_path = COALESCE(NULLIF(user_record.raw_user_meta_data::jsonb ->> 'image_path', ''), image_path),
                thumb_hash = COALESCE(NULLIF(user_record.raw_user_meta_data::jsonb ->> 'thumb_hash', ''), thumb_hash)
            WHERE id = user_record.id;
        END IF;
    END LOOP;

    -- Delete profiles that don't have a corresponding user
    DELETE FROM public.profiles
    WHERE id NOT IN (SELECT id FROM auth.users);

    -- Sync raw_user_meta_data from public.profiles
    FOR profile_record IN SELECT id, first_name, last_name, image_path FROM public.profiles
    LOOP
        -- Update the raw_user_meta_data in auth.users if it differs
        UPDATE auth.users
        SET raw_user_meta_data = 
          jsonb_set(
            jsonb_set(
              jsonb_set(
                jsonb_set(
                  COALESCE(raw_user_meta_data, '{}'),
                  '{first_name}', to_jsonb(COALESCE(profile_record.first_name, raw_user_meta_data->>'first_name')), true
                ),
                '{last_name}', to_jsonb(COALESCE(profile_record.last_name, raw_user_meta_data->>'last_name')), true
              ),
              '{image_path}', to_jsonb(COALESCE(profile_record.image_path, raw_user_meta_data->>'image_path')), true
            ),
            '{thumb_hash}', to_jsonb(COALESCE(profile_record.thumb_hash, raw_user_meta_data->>'thumb_hash')), true
          )
        WHERE id = profile_record.id AND (
            raw_user_meta_data ->> 'first_name' IS DISTINCT FROM COALESCE(profile_record.first_name, raw_user_meta_data->>'first_name') OR
            raw_user_meta_data ->> 'last_name' IS DISTINCT FROM COALESCE(profile_record.last_name, raw_user_meta_data->>'last_name') OR
            raw_user_meta_data ->> 'image_path' IS DISTINCT FROM COALESCE(profile_record.image_path, raw_user_meta_data->>'image_path') OR
            raw_user_meta_data ->> 'thumb_hash' IS DISTINCT FROM COALESCE(profile_record.thumb_hash, raw_user_meta_data->>'thumb_hash')
        );
    END LOOP;
END;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- trigger the function every time a user profile is updated
create trigger on_profile_updated
  after update on public.profiles
  for each row
  execute procedure public.update_user_metadata();

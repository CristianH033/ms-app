DROP FUNCTION IF EXISTS create_raffle_with_prizes;

CREATE OR REPLACE FUNCTION create_raffle_with_prizes(
  raffle_data JSONB,
  prizes_data JSONB
) RETURNS JSONB AS $$
DECLARE
  raffle_id INT;
  number_of_tickets INT;
  ticket_price NUMERIC;
  result JSONB;
  i INT;
BEGIN
  -- Extraer número de tickets y precio de ticket
  number_of_tickets := (raffle_data->>'number_of_tickets')::INT;
  ticket_price := (raffle_data->>'ticket_price')::NUMERIC;

  -- Insertar el registro de rifa
  INSERT INTO raffles (
    draw_id,
    name,
    description,
    image_path,
    thumb_hash,
    created_at,
    updated_at
  )
  VALUES (
    (raffle_data->>'draw_id')::INTEGER,
    raffle_data->>'name',
    raffle_data->>'description',
    raffle_data->>'image_path',
    raffle_data->>'thumb_hash',
    NOW(),
    NOW()
  )
  RETURNING id INTO raffle_id;

  -- Insertar los premios
  INSERT INTO prizes (
    raffle_id,
    name,
    prize_value,
    image_path,
    thumb_hash,
    created_at,
    updated_at
  )
  SELECT 
    raffle_id,
    prize->>'name',
    (prize->>'prize_value')::NUMERIC,
    prize->>'image_path',
    prize->>'thumb_hash',
    NOW(),
    NOW()
  FROM jsonb_array_elements(prizes_data) AS prize;

  -- Generar e insertar tickets
  FOR i IN 0..number_of_tickets-1 LOOP
    INSERT INTO tickets (
      number,
      raffle_id,
      price,
      created_at,
      updated_at
    )
    VALUES (
      LPAD(i::TEXT, 3, '0'),
      raffle_id,
      ticket_price,
      NOW(),
      NOW()
    );
  END LOOP;

  -- Preparar el resultado
  SELECT jsonb_build_object(
    'raffle_id', raffle_id,
    'prizes_count', jsonb_array_length(prizes_data),
    'tickets_count', number_of_tickets
  ) INTO result;

  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    -- Si ocurre cualquier error, lo capturamos y lo devolvemos
    RETURN jsonb_build_object('error', SQLERRM);
END;
$$ LANGUAGE plpgsql;
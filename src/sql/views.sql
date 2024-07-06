-- CREATE VIEW SellersWithTicketsCount
CREATE view sellers_with_tickets_count AS
SELECT
    s.*,
    COUNT(t.id) as total_tickets
FROM
    sellers s
    LEFT JOIN tickets t ON t.seller_id = s.id
GROUP BY
    s.id
ORDER BY
    s.id ASC;

-- CREATE VIEW SellersWithTicketsCountByRaffle
CREATE OR REPLACE VIEW sellers_with_tickets_count_by_raffle AS
SELECT
    s.*,
    r.id as raffle_id,
    COUNT(t.id) as total_tickets,
    rs.ticket_price
FROM
    sellers s
LEFT JOIN raffles_sellers rs ON rs.seller_id = s.id
LEFT JOIN raffles r ON r.id = rs.raffle_id
LEFT JOIN tickets t ON t.seller_id = s.id AND t.raffle_id = r.id
GROUP BY
    s.id, r.id, rs.ticket_price
ORDER BY
    s.id ASC;

-- CREATE VIEW SellersByRaffle
CREATE OR REPLACE VIEW sellers_by_raffle AS
SELECT
    s.*,
    rs.raffle_id
FROM
    sellers s
LEFT JOIN raffles_sellers rs ON s.id = rs.seller_id
ORDER BY
    s.id ASC, rs.raffle_id ASC;

-- CREATE VIEW RaffleStats
CREATE OR REPLACE VIEW raffle_stats AS
SELECT 
    r.id AS raffle_id,
    r.name AS raffle_name,
    r.description,
    r.image_path,
    r.thumb_hash,
    r.created_at AS raffle_created_at,
    r.updated_at AS raffle_updated_at,
    d.id AS draw_id,
    d.name AS draw_name,
    d.drawn_at AS draw_drawn_at,
    l.name AS lottery_name,
    l.image_path AS lottery_image_path,
    l.thumb_hash AS lottery_thumb_hash,
    COUNT(t.id) AS total_tickets,
    COUNT(t.id) FILTER (WHERE t.seller_id IS NULL) AS available_tickets,
    COUNT(t.id) FILTER (WHERE t.seller_id IS NOT NULL) AS taken_tickets
FROM 
    raffles r
JOIN
    draws d ON r.draw_id = d.id
JOIN
    lotteries l ON d.lottery_id = l.id
LEFT JOIN 
    tickets t ON r.id = t.raffle_id
GROUP BY 
    r.id, r.name, r.description, r.image_path, r.thumb_hash, r.created_at, r.updated_at,
    d.id, d.name, d.drawn_at, l.name, l.image_path , l.thumb_hash;
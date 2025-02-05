SELECT id, name
FROM server_tags
         JOIN tags t on t.id = server_tags.tag_id
WHERE server_id = ?;

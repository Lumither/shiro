SELECT groups.id, groups.name
FROM groups
         JOIN servers s on groups.id = s.group_id
where s.id = ?;

SELECT z.distrito, COUNT(*) AS total_delitos
FROM delito d
JOIN zona z ON z.id_zona = d.id_zona
GROUP BY z.distrito
ORDER BY total_delitos DESC
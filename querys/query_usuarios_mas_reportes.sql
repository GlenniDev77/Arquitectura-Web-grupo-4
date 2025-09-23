SELECT 
  u.id_usuario,
  u.nombre,
  COUNT(d.id_reportedelito) AS reportes_realizados
FROM usuario u
JOIN delito d ON d.id_usuario = u.id_usuario
GROUP BY u.id_usuario, u.nombre
ORDER BY reportes_realizados DESC
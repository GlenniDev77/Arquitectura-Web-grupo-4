package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.edu.upc.proyectoarquiwebjorge.entities.Delito;

import java.util.List;

public interface IDelitoRepository extends JpaRepository<Delito, Integer> {
    @Query(value = "SELECT distrito, zona, tipo_delito, total\n" +
            "FROM (\n" +
            "    SELECT \n" +
            "        z.distrito,\n" +
            "        z.nombre AS zona,\n" +
            "        d.tipo_delito,\n" +
            "        COUNT(*) AS total,\n" +
            "        ROW_NUMBER() OVER (PARTITION BY z.distrito ORDER BY COUNT(*) DESC) AS rn\n" +
            "    FROM Delito d\n" +
            "    JOIN Zona z ON d.id_zona = z.id_Zona\n" +
            "    GROUP BY z.distrito, z.nombre, d.tipo_delito\n" +
            ") t\n" +
            "WHERE rn = 1\n" +
            "ORDER BY distrito;", nativeQuery = true)
    public List<String[]> quantityDelitoPorZonaYDistrito();

    @Query(value = "SELECT \n" +
            "    z.nombre AS zona,\n" +
            "    EXTRACT(HOUR FROM d.fecha_hora) AS hora,\n" +
            "    COUNT(*) AS total\n" +
            "FROM Delito d\n" +
            "JOIN Zona z ON d.id_zona = z.id_Zona\n" +
            "GROUP BY z.nombre, hora\n" +
            "ORDER BY z.nombre, total DESC;", nativeQuery = true)
    public List<String[]> quantityMasDelitosPorHoraYZona();

    @Query(value = "SELECT\n" +
            "    EXTRACT(YEAR FROM fecha_hora) AS año,\n" +
            "    TO_CHAR(fecha_hora, 'Month') AS mes,\n" +
            "    COUNT(*) AS numero_delitos\n" +
            "FROM delito\n" +
            "WHERE fecha_hora IS NOT NULL\n" +
            "GROUP BY EXTRACT(YEAR FROM fecha_hora),\n" +
            "         EXTRACT(MONTH FROM fecha_hora),\n" +
            "         TO_CHAR(fecha_hora, 'Month')\n" +
            "ORDER BY año, EXTRACT(MONTH FROM fecha_hora);", nativeQuery = true)
    public List<String[]> quantityDelitosPorMes();

}

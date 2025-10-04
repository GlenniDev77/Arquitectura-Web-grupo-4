package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificacion;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

import java.util.List;

public interface INotificacionRepository extends JpaRepository<Notificacion, Integer> {

    @Query(value = "SELECT u.nombre, COUNT(n.id_notificacion)\n" +
            "            FROM notificacion n\n" +
            "            INNER JOIN usuario u ON n.id_usuario = u.id_usuario\n" +
            "            GROUP BY u.nombre\n" +
            "            ORDER BY COUNT(n.id_notificacion) DESC;",
            nativeQuery = true)
    public List<Object[]> usuarioMasNotis();

    @Query(value = "SELECT \n" +
            "    z.nombre,\n" +
            "    COUNT(n.id_notificacion) AS total_notificaciones\n" +
            "FROM notificacion n\n" +
            "INNER JOIN zona z ON n.id_zona = z.id_zona \n" +
            "GROUP BY z.nombre \n" +
            "ORDER BY total_notificaciones DESC;",
            nativeQuery = true)
    public List<String[]> zonaMasNotis();
}

package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificaciones;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

import java.util.List;

@Repository
public interface INotificacionesRepository extends JpaRepository<Notificaciones, Integer> {
    @Query(value = "SELECT " +
            "z.nombre_zona, " +
            "COUNT(n.id_notificacion) AS total_notificaciones " +
            "FROM notificaciones n " +
            "INNER JOIN zona z ON n.id_zona = z.id_zona " +
            "GROUP BY z.nombre_zona " +
            "ORDER BY total_notificaciones DESC",
            nativeQuery = true)
    public List<String[]> zonaMasNotis();

    @Query(value = "SELECT u.nombre_usuario, COUNT(n.id_notificacion)\n" +
            "FROM notificaciones n\n" +
            "INNER JOIN usuario u ON n.id_usuario = u.id_usuario\n" +
            "GROUP BY u.nombre_usuario\n" +
            "ORDER BY COUNT(n.id_notificacion) DESC",
            nativeQuery = true)
    public List<Object[]> usuarioMasNotis();
}

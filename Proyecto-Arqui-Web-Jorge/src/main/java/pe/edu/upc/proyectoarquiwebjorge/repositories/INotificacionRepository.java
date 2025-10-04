package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificacion;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

import java.util.List;

public interface INotificacionRepository extends JpaRepository<Notificacion, Integer> {

    @Query(value = "SELECT u.nombre_usuario, COUNT(n.id_notificacion)\n" +
            "FROM notificaciones n\n" +
            "INNER JOIN usuario u ON n.id_usuario = u.id_usuario\n" +
            "GROUP BY u.nombre_usuario\n" +
            "ORDER BY COUNT(n.id_notificacion) DESC",
            nativeQuery = true)
    public List<Object[]> usuarioMasNotis();

}

package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificacion;

public interface INotificacionRepository extends JpaRepository<Notificacion, Integer> {
}

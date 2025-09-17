package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificaciones;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
@Repository
public interface INotificacionesRepository extends JpaRepository<Notificaciones, Integer> {
}

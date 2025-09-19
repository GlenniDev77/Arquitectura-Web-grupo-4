package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upc.proyectoarquiwebjorge.entities.Delito;

public interface IDelitoRepository extends JpaRepository<Delito, Integer> {

}

package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import pe.edu.upc.proyectoarquiwebjorge.entities.Resenia;

public interface IReseniaRepository extends JpaRepository<Resenia, Integer> {
}

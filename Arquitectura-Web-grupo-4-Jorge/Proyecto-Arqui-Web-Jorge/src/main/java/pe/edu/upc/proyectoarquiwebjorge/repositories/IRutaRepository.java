package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;

@Repository
public interface IRutaRepository extends JpaRepository<Ruta, Integer> {
}

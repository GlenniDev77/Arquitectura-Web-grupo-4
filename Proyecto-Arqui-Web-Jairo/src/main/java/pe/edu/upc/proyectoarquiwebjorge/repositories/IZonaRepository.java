package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.proyectoarquiwebjorge.entities.Zona;

@Repository
public interface IZonaRepository extends JpaRepository<Zona,Integer> {
}

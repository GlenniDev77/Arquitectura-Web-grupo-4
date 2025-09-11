package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upc.proyectoarquiwebjorge.entities.TipoVehiculo;

public interface ITVehiculoRepository extends JpaRepository<TipoVehiculo,Integer> {

}

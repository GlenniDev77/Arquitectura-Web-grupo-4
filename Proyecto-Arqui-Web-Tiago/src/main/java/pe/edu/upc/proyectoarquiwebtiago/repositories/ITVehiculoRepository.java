package pe.edu.upc.proyectoarquiwebtiago.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.proyectoarquiwebtiago.entities.TipoVehiculo;

import java.util.List;

@Repository
public interface ITVehiculoRepository extends JpaRepository<TipoVehiculo,Integer> {
    @Query("Select dev from TipoVehiculo dev where dev.nombre_vehiculo like %:tipo%")
    public List<TipoVehiculo> buscarPorNombreVehiculo(@Param("tipo")String tipo);
}

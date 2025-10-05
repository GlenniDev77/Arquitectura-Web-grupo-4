package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

import java.util.List;

public interface IRutaRepository extends JpaRepository<Ruta, Integer> {
    @Query("Select usa from Ruta usa where usa.destino like %:destino%")
    public List<Ruta> buscaRutaPorDestino(@Param("destino")String destino);

    @Query("Select usa from Ruta usa where usa.origen like %:origen%")
    public List<Ruta> buscaRutaPorOrigen(@Param("origen")String origen);

    @Query(value = "SELECT\n" +
            "    tv.nombre_vehiculo AS tipo_vehiculo,\n" +
            "    COUNT(r.id_ruta) AS cantidad_rutas\n" +
            "FROM Ruta r\n" +
            "INNER JOIN tipo_vehiculo tv ON r.id_tipovehiculo = tv.id_tipovehiculo\n" +
            "GROUP BY tv.id_tipovehiculo, tv.nombre_vehiculo \n" +
            "ORDER BY COUNT(r.id_ruta) DESC;",nativeQuery = true)
    public List<String[]> CantRutasPorTipoDeVehiculo();
}

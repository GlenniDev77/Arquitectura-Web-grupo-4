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
}

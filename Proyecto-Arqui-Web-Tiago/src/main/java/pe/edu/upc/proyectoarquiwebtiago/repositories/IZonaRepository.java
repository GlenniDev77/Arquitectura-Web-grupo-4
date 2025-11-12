package pe.edu.upc.proyectoarquiwebtiago.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.proyectoarquiwebtiago.entities.Zona;

import java.util.List;

@Repository
public interface IZonaRepository extends JpaRepository<Zona,Integer> {
    @Query("Select zon from Zona zon where zon.nombre like %:nombre%")
    public List<Zona> buscarPorZonaNombre(@Param("nombre")String nombre);
}

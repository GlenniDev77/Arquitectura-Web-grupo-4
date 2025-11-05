package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;

import java.util.List;

@Repository
public interface IRolRepository extends JpaRepository<Rol,Integer> {
    @Query("Select dev from Rol dev where dev.nombre_rol like %:tipo%")
    public List<Rol> buscarPorNombreRol(@Param("tipo")String tipo);
}

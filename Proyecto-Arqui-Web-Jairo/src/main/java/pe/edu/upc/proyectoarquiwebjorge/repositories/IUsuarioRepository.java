package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario,Integer> {
    @Query("select dev from Usuario dev where dev.nombre_usuario like %:tipo%")
    public List<Usuario> buscarR(@Param("tipo") String tipo);
}

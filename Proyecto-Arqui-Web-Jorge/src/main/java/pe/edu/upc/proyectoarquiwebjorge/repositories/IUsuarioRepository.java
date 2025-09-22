package pe.edu.upc.proyectoarquiwebjorge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

import java.util.List;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario,Integer> {
    @Query("Select usa from Usuario usa where usa.nombre like %:nombre%")
    public List<Usuario> buscarPorNombreUs(@Param("nombre")String nombre);

    @Query(value = "SELECT (SELECT COUNT(*) FROM usuario) AS total_registrados,\n" +
            "    (SELECT COUNT(DISTINCT u.id_usuario)FROM usuario u\n" +
            "     LEFT JOIN delito d ON u.id_usuario = d.id_usuario\n" +
            "     LEFT JOIN ruta r ON u.id_usuario = r.id_usuario\n" +
            "     LEFT JOIN resenia re ON u.id_usuario = re.id_usuario\n" +
            "     WHERE d.id_reportedelito IS NOT NULL \n" +
            "        OR r.id_ruta IS NOT NULL \n" +
            "        OR re.id_resenia IS NOT NULL\n" +
            "    ) AS total_activos;",nativeQuery = true)
    public List<int[]> TotalUsuarioActivos(); // Cantidad de usuarios registrados vs activos

    @Query(value = "SELECT z.nombre AS zona,\n" +
            "COUNT(DISTINCT d.id_usuario) AS cantidad_usuarios\n" +
            "FROM zona z\n" +
            "JOIN delito d ON z.id_zona = d.id_zona\n" +
            "GROUP BY z.nombre\n" +
            "ORDER BY cantidad_usuarios DESC;",nativeQuery = true)
    public List<String[]> TotalUsuXzona(); //Distribución de usuarios por zona donde reportaron delitos
}

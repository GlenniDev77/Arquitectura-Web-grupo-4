package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IUsuarioRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IUsuarioService;

import java.util.List;

@Service
public class UsuarioServiceImplement implements IUsuarioService {

    @Autowired
    private IUsuarioRepository uS;

    @Override
    public List<Usuario> list() {
        return uS.findAll();
    }

    @Override
    public void insert(Usuario usuario) {
        uS.save(usuario);
    }

    @Override
    public Usuario listIdUsuario(int id_usuario) {
        return uS.findById(id_usuario).orElse(null);
    }


    @Override
    public void deleteUsuario(int id_usuario) {
        uS.deleteById(id_usuario);
    }

    @Override
    public void updateUsuario(Usuario usuario) {
        uS.save(usuario);
    }

    @Override
    public List<Usuario> buscarPorNombreUsuario(String nombreUsuario) {
        return uS.buscarPorNombreUs(nombreUsuario);
    }
}

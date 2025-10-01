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
    public Usuario listId(int id) {
        return uS.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        uS.deleteById(id);
    }

    @Override
    public void update(Usuario usuario) {
        uS.save(usuario);
    }

    @Override
    public List<Usuario> buscarService(String nombre_usuario) {
        return uS.buscarR(nombre_usuario);
    }

}

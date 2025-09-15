package com.example.trabajogrupal_tiago.servicesimplements;

import com.example.trabajogrupal_tiago.entities.Usuario;
import com.example.trabajogrupal_tiago.repositories.IUsuarioRepository;
import com.example.trabajogrupal_tiago.servicesinterfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImplement implements IUsuarioService {
    @Autowired
    private IUsuarioRepository usuaR;

    @Override
    public List<Usuario> list() {
        return usuaR.findAll();
    }

    @Override
    public void insert(Usuario usuario) {
        usuaR.save(usuario);
    }

    @Override
    public Usuario listId(int id) {
        return usuaR.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        usuaR.deleteById(id);
    }
}

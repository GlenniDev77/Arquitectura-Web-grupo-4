package com.example.trabajogrupal_tiago.servicesinterfaces;

import com.example.trabajogrupal_tiago.entities.Rol;
import com.example.trabajogrupal_tiago.entities.Usuario;

import java.util.List;

public interface IUsuarioService {
    public List<Usuario> list();
    public void insert(Usuario usuario);
    public Usuario listId(int id);
    public void delete(int id);
}

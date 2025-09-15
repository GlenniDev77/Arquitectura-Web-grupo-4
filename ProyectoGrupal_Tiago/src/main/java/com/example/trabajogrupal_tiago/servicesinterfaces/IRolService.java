package com.example.trabajogrupal_tiago.servicesinterfaces;

import com.example.trabajogrupal_tiago.entities.Rol;

import java.util.List;

public interface IRolService {
    public List<Rol> list();
    public void insert(Rol rol);
    public Rol listId(int id);
    public void delete(int id);
}

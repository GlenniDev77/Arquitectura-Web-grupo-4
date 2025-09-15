package com.example.trabajogrupal_tiago.servicesimplements;

import com.example.trabajogrupal_tiago.entities.Rol;
import com.example.trabajogrupal_tiago.repositories.IRolRepository;
import com.example.trabajogrupal_tiago.servicesinterfaces.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImplement implements IRolService {

    @Autowired
    private IRolRepository ds;

    @Override
    public List<Rol> list() {
        return ds.findAll();
    }

    @Override
    public void insert(Rol rol) {
        ds.save(rol);
    }

    @Override
    public Rol listId(int id) {
        return ds.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        ds.deleteById(id);
    }
}

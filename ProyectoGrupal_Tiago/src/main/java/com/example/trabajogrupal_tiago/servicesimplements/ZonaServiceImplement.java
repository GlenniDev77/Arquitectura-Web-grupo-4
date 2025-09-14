package com.example.trabajogrupal_tiago.servicesimplements;

import com.example.trabajogrupal_tiago.dtos.ZonaDTO;
import com.example.trabajogrupal_tiago.entities.Zona;
import com.example.trabajogrupal_tiago.repositories.IZonaRepository;
import com.example.trabajogrupal_tiago.servicesinterfaces.IZonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZonaServiceImplement implements IZonaService {
    @Autowired
    private IZonaRepository ds;

    @Override
    public List<Zona> list(){return ds.findAll();}

    @Override
    public void insert(Zona zona){ds.save(zona);}

    @Override
    public Zona listId(Integer id) {
        return ds.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        ds.deleteById(id);
    }

    @Override
    public void update(Zona zona) {ds.save(zona);}

    @Override
    public List<Zona> buscarService(String tipo) {return ds.buscarR(tipo);}

}

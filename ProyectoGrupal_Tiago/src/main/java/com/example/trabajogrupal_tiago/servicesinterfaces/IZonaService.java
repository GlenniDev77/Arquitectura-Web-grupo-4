package com.example.trabajogrupal_tiago.servicesinterfaces;

import com.example.trabajogrupal_tiago.entities.Zona;
import java.util.List;

public interface IZonaService {
    public List<Zona> list();
    public void insert(Zona zona);
    public Zona listId(Integer id);
    public void delete(int id);
    public void update(Zona zona);
    public List<Zona> buscarService(String distrito);
}

package com.example.trabajogrupal_tiago.servicesinterfaces;
import com.example.trabajogrupal_tiago.entities.TipoVehiculo;

import java.util.List;

public interface ITipoVehiculoService {
    public List<TipoVehiculo> list();
    public void insert(TipoVehiculo tipovehiculo);
    public TipoVehiculo listId(int id);
    public void delete(int id);
}

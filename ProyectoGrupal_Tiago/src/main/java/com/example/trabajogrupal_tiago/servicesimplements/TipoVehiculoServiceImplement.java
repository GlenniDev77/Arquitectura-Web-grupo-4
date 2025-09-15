package com.example.trabajogrupal_tiago.servicesimplements;
import com.example.trabajogrupal_tiago.entities.TipoVehiculo;
import com.example.trabajogrupal_tiago.repositories.ITipoVehiculoRepository;
import com.example.trabajogrupal_tiago.servicesinterfaces.ITipoVehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TipoVehiculoServiceImplement implements ITipoVehiculoService {

    @Autowired
    private ITipoVehiculoRepository tvservice;

    @Override
    public List<TipoVehiculo> list() {
        return tvservice.findAll();
    }

    @Override
    public void insert(TipoVehiculo tipovehiculo) {
        tvservice.save(tipovehiculo);
    }

    @Override
    public TipoVehiculo listId(int id) {
        return tvservice.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        tvservice.deleteById(id);
    }
}

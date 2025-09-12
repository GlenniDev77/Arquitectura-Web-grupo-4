package com.example.trabajogrupal_tiago.servicesimplements;

import com.example.trabajogrupal_tiago.entities.Zona;
import com.example.trabajogrupal_tiago.repositories.IDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeviceServiceImplement {
    @Autowired
    private IDeviceRepository ds;

    @Override
    public void insert(Zona) list(){return ds.findAll()}
}

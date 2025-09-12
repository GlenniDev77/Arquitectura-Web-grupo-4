package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Zona;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IZonaRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IZonaService;

import java.util.List;

@Service
public class ZonaServiceImplement implements IZonaService {
    @Autowired
    private IZonaRepository zS;
    @Override
    public List<Zona> list() {
        return zS.findAll();
    }

    @Override
    public void insert(Zona zona) {
        zS.save(zona);
    }
}

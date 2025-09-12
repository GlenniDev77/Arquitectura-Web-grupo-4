package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IRutaRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IRutaService;

import java.util.List;
import java.util.Optional;

@Service
public class RutaServiceImplement implements IRutaService {

    @Autowired
    private IRutaRepository rR;

    @Override
    public void insert(Ruta ruta) {
        rR.save(ruta);
    }

    @Override
    public List<Ruta> list() {
        return rR.findAll();
    }

    @Override
    public void delete(int id) {
        rR.deleteById(id);
    }

    @Override
    public Optional<Ruta> listId(int id) {
        return rR.findById(id);
    }
}

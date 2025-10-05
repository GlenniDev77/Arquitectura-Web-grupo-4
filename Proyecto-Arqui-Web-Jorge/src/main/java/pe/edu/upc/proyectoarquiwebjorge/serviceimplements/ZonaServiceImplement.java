package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.entities.Zona;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IZonaRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IZonaService;

import java.util.List;

@Service
public class ZonaServiceImplement implements IZonaService {

    @Autowired
    private IZonaRepository zR;

    @Override
    public List<Zona> list() {
        return zR.findAll();
    }

    @Override
    public void insert(Zona zona) {
        zR.save(zona);
    }

    @Override
    public Zona listById(int id) {
        return zR.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        zR.deleteById(id);
    }

    @Override
    public void update(Zona zona) {
        zR.save(zona);
    }

    @Override
    public List<Zona> buscarPorNombreZona(String nombreZona) {
        return zR.buscarPorZonaNombre(nombreZona);
    }


}

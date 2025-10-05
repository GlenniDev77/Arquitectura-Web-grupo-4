package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.repositories.INotificacionRepository;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IRutaRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IRutaService;

import java.util.List;

@Service
public class RutaServiceImplements implements IRutaService {
    @Autowired
    private IRutaRepository iR;

    @Override
    public List<Ruta> list() {
        return iR.findAll();
    }

    @Override
    public void insert(Ruta ruta) {
        iR.save(ruta);
    }

    @Override
    public Ruta listIdRuta(int id_ruta) {
        return iR.findById(id_ruta).orElse(null);
    }

    @Override
    public void deleteRuta(int id_ruta) {
        iR.deleteById(id_ruta);
    }

    @Override
    public void updateRuta(Ruta ruta) {
        iR.save(ruta);
    }

    @Override
    public List<Ruta> buscarRutaDestino(String destino) {
        return iR.buscaRutaPorDestino(destino);
    }

    @Override
    public List<Ruta> buscarRutaOrigen(String origen) {
        return iR.buscaRutaPorOrigen(origen);
    }

    @Override
    public List<String[]> CantRutasPorTipoDeVehiculo() {
        return iR.CantRutasPorTipoDeVehiculo();
    }


}

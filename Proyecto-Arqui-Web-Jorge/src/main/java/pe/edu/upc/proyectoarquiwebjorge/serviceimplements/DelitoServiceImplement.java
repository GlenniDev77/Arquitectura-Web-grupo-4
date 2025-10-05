package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Delito;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IDelitoRepository;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IReseniaRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IDelitoService;

import java.util.List;

@Service
public class DelitoServiceImplement implements IDelitoService {
    @Autowired
    private IDelitoRepository rR;

    @Override
    public List<Delito> list() {
        return rR.findAll();
    }

    @Override
    public void insert(Delito delito) {
        rR.save(delito);
    }

    @Override
    public Delito listIdDelito(int id_delito) {
        return rR.findById(id_delito).orElse(null);
    }

    @Override
    public void deleteDelito(int id_delito) {
        rR.deleteById(id_delito);
    }

    @Override
    public List<String[]> quantityDelitoPorZonaYDistrito() {
        return rR.quantityDelitoPorZonaYDistrito();
    }

    @Override
    public List<String[]> quantityMasDelitosPorHoraYZona() {
        return rR.quantityMasDelitosPorHoraYZona();
    }

    @Override
    public List<String[]> quantityDelitosPorMes() {
        return rR.quantityDelitosPorMes();
    }
}

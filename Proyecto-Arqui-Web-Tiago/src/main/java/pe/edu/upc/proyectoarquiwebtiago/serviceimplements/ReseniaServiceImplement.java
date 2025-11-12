package pe.edu.upc.proyectoarquiwebtiago.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebtiago.entities.Resenia;
import pe.edu.upc.proyectoarquiwebtiago.repositories.IReseniaRepository;
import pe.edu.upc.proyectoarquiwebtiago.servicesinterfaces.IReseniaService;

import java.util.List;

@Service
public class ReseniaServiceImplement implements IReseniaService {
    @Autowired
    private IReseniaRepository rR;

    @Override
    public List<Resenia> list() {
        return rR.findAll();
    }

    @Override
    public void insert(Resenia resenia) {
        rR.save(resenia);
    }

    @Override
    public Resenia listIdResenia(int id_resenia) {
        return rR.findById(id_resenia).orElse(null);
    }

    @Override
    public void deleteResenia(int id_resenia) {
        rR.deleteById(id_resenia);
    }
}

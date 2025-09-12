package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Resena;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IResenaRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IResenaService;

import java.util.List;
import java.util.Optional;

@Service
public class ReseñaServiceImplement implements IResenaService {

    @Autowired
    private IResenaRepository rR;

    @Override
    public void insert(Resena resena) {
        rR.save(resena);
    }

    @Override
    public List<Resena> list() {
        return rR.findAll();
    }

    @Override
    public void delete(int id) {
        rR.deleteById(id);
    }

    @Override
    public Optional<Resena> listId(int id) {
        return rR.findById(id);
    }
}

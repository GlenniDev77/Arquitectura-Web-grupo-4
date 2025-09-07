package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IRolRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IRolService;

import java.util.List;

@Service
public class RolServiceImplement implements IRolService {

    @Autowired
    private IRolRepository rS;

    @Override
    public List<Rol> list(){
        return rS.findAll();
    }

    @Override
    public void insert(Rol rol){
        rS.save(rol);
    }

}

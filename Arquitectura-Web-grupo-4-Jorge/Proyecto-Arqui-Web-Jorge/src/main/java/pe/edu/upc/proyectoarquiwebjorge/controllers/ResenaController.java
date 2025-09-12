package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.entities.Resena;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IResenaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/resenas")
public class ResenaController {

    @Autowired
    private IResenaService rS;

    @PostMapping
    public void registrar(@RequestBody Resena resena) {
        rS.insert(resena);
    }

    @GetMapping
    public List<Resena> listar() {
        return rS.list();
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") Integer id) {
        rS.delete(id);
    }

    @GetMapping("/{id}")
    public Optional<Resena> listarId(@PathVariable("id") Integer id) {
        return rS.listId(id);
    }
}

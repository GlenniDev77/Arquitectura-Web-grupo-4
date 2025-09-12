package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IRutaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rutas")
public class RutaController {

    @Autowired
    private IRutaService rS;

    @PostMapping
    public void registrar(@RequestBody Ruta ruta) {
        rS.insert(ruta);
    }

    @GetMapping
    public List<Ruta> listar() {
        return rS.list();
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") Integer id) {
        rS.delete(id);
    }

    @GetMapping("/{id}")
    public Optional<Ruta> listarId(@PathVariable("id") Integer id) {
        return rS.listId(id);
    }
}

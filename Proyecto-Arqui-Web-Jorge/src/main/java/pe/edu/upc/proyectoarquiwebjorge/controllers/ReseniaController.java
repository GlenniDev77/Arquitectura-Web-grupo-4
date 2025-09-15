package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.ReseniaDTOInsert;
import pe.edu.upc.proyectoarquiwebjorge.dtos.ReseniaDTOList;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RutaDTOInsert;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RutaDTOList;
import pe.edu.upc.proyectoarquiwebjorge.entities.Resenia;
import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IReseniaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/resenias")
public class ReseniaController {
    @Autowired
    private IReseniaService rS;

    @GetMapping
    public List<ReseniaDTOList> list() {
        return this.rS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (ReseniaDTOList)mapper.map(y, ReseniaDTOList.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void insert(@RequestBody ReseniaDTOInsert dto) {
        ModelMapper mapper = new ModelMapper();
        Resenia n=mapper.map(dto, Resenia.class);
        rS.insert(n);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarReseniaPorId(@PathVariable("id") Integer id) {
        Resenia res = rS.listIdResenia(id);
        if (res == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe una reseña con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        ReseniaDTOList dto = m.map(res, ReseniaDTOList.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarResenia(@PathVariable("id") Integer id) {
        Resenia u = rS.listIdResenia(id);
        if (u == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe una reseña con el ID: " + id);
        }
        rS.deleteResenia(id);
        return ResponseEntity.ok("Reseña con ID " + id + " eliminado correctamente.");
    }

}

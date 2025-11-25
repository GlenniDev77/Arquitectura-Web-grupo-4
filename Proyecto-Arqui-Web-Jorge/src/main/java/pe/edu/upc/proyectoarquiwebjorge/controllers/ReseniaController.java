package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.*;
import pe.edu.upc.proyectoarquiwebjorge.entities.*;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IReseniaService;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IUsuarioService;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IZonaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/resenias")
public class ReseniaController {
    @Autowired
    private IReseniaService rS;

    @Autowired
    private IUsuarioService uS;

    @GetMapping
    //@PreAuthorize("hasAuthority('ADMIN') or hasAnyAuthority('AUTORIDAD') or hasAuthority('MODERADOR')")
    public List<ReseniaDTOList> list() {
        return this.rS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (ReseniaDTOList)mapper.map(y, ReseniaDTOList.class);
        }).collect(Collectors.toList());
    }


    @PostMapping
    //@PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> insert(@RequestBody ReseniaDTOInsert dto) {
        ModelMapper mapper = new ModelMapper();
        Resenia d = mapper.map(dto, Resenia.class);
        rS.insert(d);

        Usuario us = uS.listIdUsuario(dto.getUsuario().getId_usuario());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Reseña por [" + us.getNombre() + "] con valoracion de [ "
                        + dto.getCalificacion() + " ] registrado correctamente ");
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMIN') or hasAnyAuthority('AUTORIDAD') or hasAuthority('MODERADOR')")
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
    //@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MODERADOR')")
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

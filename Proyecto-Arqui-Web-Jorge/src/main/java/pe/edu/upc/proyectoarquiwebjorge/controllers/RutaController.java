package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.*;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificacion;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IRutaService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rutas")
public class RutaController {

    @Autowired
    private IRutaService rS;

    @GetMapping
    //@PreAuthorize("hasAuthority('ADMIN') or hasAnyAuthority('AUTORIDAD') or hasAuthority('MODERADOR')")
    public List<RutaDTOList> list() {
        return this.rS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (RutaDTOList)mapper.map(y, RutaDTOList.class);
        }).collect(Collectors.toList());
    }


    @PostMapping
    //@PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> insert(@RequestBody RutaDTOInsert dto) {
        ModelMapper mapper = new ModelMapper();
        Ruta d = mapper.map(dto, Ruta.class);
        rS.insert(d);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Ruta con origen en [ " + dto.getOrigen() + " ] y " +
                        "destino a [ " + dto.getDestino() + " ] registrado correctamente ");
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMIN') or hasAnyAuthority('AUTORIDAD') or hasAuthority('MODERADOR')")
    public ResponseEntity<?> listarRutaPorId(@PathVariable("id") Integer id) {
        Ruta rut = rS.listIdRuta(id);
        if (rut == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe una ruta con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        RutaDTOList dto = m.map(rut, RutaDTOList.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminarRuta(@PathVariable("id") Integer id) {
        Ruta u = rS.listIdRuta(id);
        if (u == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe una ruta con el ID: " + id);
        }
        rS.deleteRuta(id);
        return ResponseEntity.ok("Ruta con ID " + id + " eliminado correctamente.");
    }

    @PutMapping
    //@PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> modificar(@RequestBody RutaDTOInsert dto) {
        ModelMapper m = new ModelMapper();
        Ruta ruta = m.map(dto, Ruta.class);

        // Validación de existencia
        Ruta existente = rS.listIdRuta(ruta.getId_ruta());
        if (existente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede modificar. No existe una ruta con el ID: " + ruta.getId_ruta());
        }

        // Actualización si pasa validaciones
        rS.updateRuta(ruta);
        return ResponseEntity.ok("Ruta con ID " + ruta.getId_ruta() + " modificado correctamente.");
    }

    @GetMapping("/destino")
    //@PreAuthorize("hasAuthority('ADMIN') or hasAnyAuthority('AUTORIDAD') or hasAuthority('USER')")
    public ResponseEntity<?> buscarDestino(@RequestParam String t) {
        List<Ruta> rutas = rS.buscarRutaDestino(t);

        if (rutas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron rutas con destino a: " + t);
        }

        List<RutaDTOList> listaDTO = rutas.stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, RutaDTOList.class);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(listaDTO);
    }

    @GetMapping("/origen")
    //@PreAuthorize("hasAuthority('ADMIN') or hasAnyAuthority('AUTORIDAD') or hasAuthority('USER')")
    public ResponseEntity<?> buscarOrigen(@RequestParam String t) {
        List<Ruta> rutas = rS.buscarRutaOrigen(t);

        if (rutas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron rutas con origen en: " + t);
        }

        List<RutaDTOList> listaDTO = rutas.stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, RutaDTOList.class);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(listaDTO);
    }

    @GetMapping("/CantRutasPorVehiculo")
    //@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MODERADOR')")
    public ResponseEntity<?> CantidadRutasPorVehiculo() {
        List<String[]> fila = rS.CantRutasPorTipoDeVehiculo();

        if (fila.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron rutas");
        }

        List<CantRutasporTipoVehiDTO> listaDTO = new ArrayList<>();

        for (String[] u : fila) {
            CantRutasporTipoVehiDTO dto = new CantRutasporTipoVehiDTO();
            dto.setTipoVehi(u[0]);
            dto.setCantidad_rutas(Integer.parseInt(u[1]));
            listaDTO.add(dto);
        }

        return ResponseEntity.ok(listaDTO);
    }
}

package com.example.trabajogrupal_tiago.repositories;

import com.example.trabajogrupal_tiago.entities.Zona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IZonaRepository extends JpaRepository<Zona,Integer> {
    //esta 2 lineas de abajo son solo para la funcion buscar, si la entidad no
    //necesita esa funcion, este repository queda vacio
    @Query("Select dev from Zona dev where dev.distrito like %:dist%")
    public List<Zona> buscarR(@Param("dist") String dist);
}

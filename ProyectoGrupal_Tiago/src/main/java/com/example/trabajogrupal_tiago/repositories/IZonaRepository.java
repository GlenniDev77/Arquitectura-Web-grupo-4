package com.example.trabajogrupal_tiago.repositories;

import com.example.trabajogrupal_tiago.entities.Zona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IZonaRepository extends JpaRepository<Zona,Integer> {
    @Query("Select dev from Zona dev where dev.typeDevice like %:tipo%")
    public List<Zona> buscarR(@Param("tipo") String tipo);
}

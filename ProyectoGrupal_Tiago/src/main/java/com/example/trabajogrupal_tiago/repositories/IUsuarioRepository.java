package com.example.trabajogrupal_tiago.repositories;

import com.example.trabajogrupal_tiago.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUsuarioRepository extends JpaRepository<Usuario,Integer> {
}

package com.example.trabajogrupal_tiago.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "TipoVehiculo")
public class TipoVehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_tipovehiculo;

    @Column(name = "nombre",length = 50,nullable = false)
    private String nombre;



    public TipoVehiculo() {} //constructor

    public TipoVehiculo(int id_tipovehiculo, String nombre) {
        this.id_tipovehiculo = id_tipovehiculo;
        this.nombre = nombre;
    }



    public int getId_tipovehiculo() {
        return id_tipovehiculo;
    }

    public void setId_tipovehiculo(int id_tipovehiculo) {
        this.id_tipovehiculo = id_tipovehiculo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}

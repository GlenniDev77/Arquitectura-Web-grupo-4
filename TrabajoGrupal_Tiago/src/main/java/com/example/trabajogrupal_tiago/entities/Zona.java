package com.example.trabajogrupal_tiago.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.Comment;

@Entity
@Table(name = "Zona")
public class Zona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_zona;

    @Column(name = "nombre",length = 50,nullable = false)
    private String nombre;

    @Column(name = "distrito",length = 100,nullable = false)
    private String distrito;

    @Column(name = "EstadoZona",length = 50,nullable = false)
    private String EstadoZona;

    @Column(name = "latitud",nullable = false)
    private Float latitud;

    @Column(name = "longitud",nullable = false)
    private Float longitud;

    public Zona() {} //constructor

    public Zona(int id_zona, String nombre, String distrito, String EstadoZona, float latitud, float longitud) {
        this.id_zona = id_zona;
        this.nombre = nombre;
        this.distrito = distrito;
        this.EstadoZona = EstadoZona;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    public int getId_zona() {
        return id_zona;
    }

    public void setId_zona(int id_zona) {
        this.id_zona = id_zona;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getEstadoZona() {
        return EstadoZona;
    }

    public void setEstadoZona(String estadoZona) {
        EstadoZona = estadoZona;
    }

    public Float getLatitud() {
        return latitud;
    }

    public void setLatitud(Float latitud) {
        this.latitud = latitud;
    }

    public Float getLongitud() {
        return longitud;
    }

    public void setLongitud(Float longitud) {
        this.longitud = longitud;
    }
}

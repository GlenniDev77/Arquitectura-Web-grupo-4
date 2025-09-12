package pe.edu.upc.proyectoarquiwebjorge.entities;

import jakarta.persistence.*;
@Entity
@Table(name = "Zona")
public class Zona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_zona;
    @Column(name = "nombre_zona",length = 50,nullable = false)
    private String nombre_zona;
    @Column(name = "distrito",length = 50,nullable = false)
    private String distrito;
    @Column(name = "estado_zona",length = 50,nullable = false)
    private String estado_zona;
    @Column(name = "latitud",length = 50,nullable = false)
    private float latitud;
    @Column(name = "longituf",length = 50,nullable = false)
    private float longitud;

    public Zona() {

    }

    public Zona(int id_zona, String nombre_zona, String distrito, String estado_zona, float latitud, float longitud) {
        this.id_zona = id_zona;
        this.nombre_zona = nombre_zona;
        this.distrito = distrito;
        this.estado_zona = estado_zona;
        this.latitud = latitud;
        this.longitud = longitud;
    }


    public int getId_zona() {
        return id_zona;
    }

    public void setId_zona(int id_zona) {
        this.id_zona = id_zona;
    }

    public String getNombre_zona() {
        return nombre_zona;
    }

    public void setNombre_zona(String nombre_zona) {
        this.nombre_zona = nombre_zona;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getEstado_zona() {
        return estado_zona;
    }

    public void setEstado_zona(String estado_zona) {
        this.estado_zona = estado_zona;
    }

    public float getLatitud() {
        return latitud;
    }

    public void setLatitud(float latitud) {
        this.latitud = latitud;
    }

    public float getLongitud() {
        return longitud;
    }

    public void setLongitud(float longitud) {
        this.longitud = longitud;
    }
}



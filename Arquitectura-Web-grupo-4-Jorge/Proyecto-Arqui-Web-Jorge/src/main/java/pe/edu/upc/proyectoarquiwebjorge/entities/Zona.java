package pe.edu.upc.proyectoarquiwebjorge.entities;

import jakarta.persistence.*;

@Entity
@Table(name="Zona")
public class Zona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idZona;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "distrito")
    private String distrito;

    @Column(name = "estadoZona")
    private String estadoZona;

    @Column(name = "latitud")
    private float latitud;

    @Column(name = "longitud")
    private float longitud;

    public Zona() {
    }

    public Zona(int idZona, String nombre, String distrito, String estadoZona, float latitud, float longitud) {
        this.idZona = idZona;
        this.nombre = nombre;
        this.distrito = distrito;
        this.estadoZona = estadoZona;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    public int getIdZona() {
        return idZona;
    }

    public void setIdZona(int idZona) {
        this.idZona = idZona;
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
        return estadoZona;
    }

    public void setEstadoZona(String estadoZona) {
        this.estadoZona = estadoZona;
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

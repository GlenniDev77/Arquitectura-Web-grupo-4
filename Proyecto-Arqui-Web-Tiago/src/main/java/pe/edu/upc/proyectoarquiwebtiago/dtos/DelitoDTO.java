package pe.edu.upc.proyectoarquiwebtiago.dtos;

import pe.edu.upc.proyectoarquiwebtiago.entities.Usuario;
import pe.edu.upc.proyectoarquiwebtiago.entities.Zona;

import java.time.LocalDateTime;

public class DelitoDTO {

    private int id_reportedelito;
    private String tipo_delito;
    private String descripcion;
    private LocalDateTime fecha_hora;
    private String nombre;
    private Usuario usuario;
    private Zona zona;

    public int getId_reportedelito() {
        return id_reportedelito;
    }

    public void setId_reportedelito(int id_reportedelito) {
        this.id_reportedelito = id_reportedelito;
    }

    public String getTipo_delito() {
        return tipo_delito;
    }

    public void setTipo_delito(String tipo_delito) {
        this.tipo_delito = tipo_delito;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDateTime getFecha_hora() {
        return fecha_hora;
    }

    public void setFecha_hora(LocalDateTime fecha_hora) {
        this.fecha_hora = fecha_hora;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Zona getZona() {
        return zona;
    }

    public void setZona(Zona zona) {
        this.zona = zona;
    }
}

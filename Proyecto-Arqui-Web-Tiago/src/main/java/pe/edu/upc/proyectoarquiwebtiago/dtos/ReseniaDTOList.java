package pe.edu.upc.proyectoarquiwebtiago.dtos;

import pe.edu.upc.proyectoarquiwebtiago.entities.Usuario;

import java.time.LocalDate;

public class ReseniaDTOList {

    private String comentario;
    private float calificacion;
    private LocalDate fecha;
    private Usuario usuario;

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public float getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(float calificacion) {
        this.calificacion = calificacion;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}

package pe.edu.upc.proyectoarquiwebjorge.dtos;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

import java.time.LocalDate;

public class ReseniaDTOInsert {
    private int id_resenia;
    private String comentario;
    private float calificacion;
    private LocalDate fecha;
    private Usuario usuario;
    private Ruta ruta;

    public int getId_resenia() {
        return id_resenia;
    }

    public void setId_resenia(int id_resenia) {
        this.id_resenia = id_resenia;
    }

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

    public Ruta getRuta() {
        return ruta;
    }

    public void setRuta(Ruta ruta) {
        this.ruta = ruta;
    }
}

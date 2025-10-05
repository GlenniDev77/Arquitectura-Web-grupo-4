package pe.edu.upc.proyectoarquiwebjorge.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Resenia")
public class Resenia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_resenia;

    @Column(name = "Comentario",length = 100, nullable = false)
    private String comentario;

    @Column(name = "calificacion",length = 50, nullable = false)
    private float calificacion;

    @Column(name = "fecha",length = 50, nullable = false)
    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_ruta")
    private Ruta ruta;

    public Resenia() {
    }

    public Resenia(int id_resenia, String comentario, float calificacion, LocalDate fecha, Usuario usuario, Ruta ruta) {
        this.id_resenia = id_resenia;
        this.comentario = comentario;
        this.calificacion = calificacion;
        this.fecha = fecha;
        this.usuario = usuario;
        this.ruta = ruta;
    }

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

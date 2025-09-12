package pe.edu.upc.proyectoarquiwebjorge.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "resenas")
public class Resena {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_resena;

    @Column(name = "comentario", length = 255)
    private String comentario;

    @Column(name = "calificacion")
    private int calificacion;

    public Resena() {
    }

    public int getId_resena() {
        return id_resena;
    }

    public void setId_resena(int id_reseña) {
        this.id_resena = id_reseña;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public int getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(int calificacion) {
        this.calificacion = calificacion;
    }
}

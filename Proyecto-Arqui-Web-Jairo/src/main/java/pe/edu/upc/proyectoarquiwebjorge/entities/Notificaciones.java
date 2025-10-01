package pe.edu.upc.proyectoarquiwebjorge.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Notificaciones")
public class Notificaciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_notificacion;
    @Column(name = "mensaje", length = 50, nullable = false)
    private String mensaje;
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "id_zona")
    private Zona zona;

    public Notificaciones() {
    }

    public Notificaciones(int id_notificacion, String mensaje, Usuario usuario, Zona zona) {
        this.id_notificacion = id_notificacion;
        this.mensaje = mensaje;
        this.usuario = usuario;
        this.zona = zona;
    }

    public int getId_notificacion() {
        return id_notificacion;
    }

    public void setId_notificacion(int id_notificacion) {
        this.id_notificacion = id_notificacion;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
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

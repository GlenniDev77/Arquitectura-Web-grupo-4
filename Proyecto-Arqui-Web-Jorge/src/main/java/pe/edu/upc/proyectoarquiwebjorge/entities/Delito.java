package pe.edu.upc.proyectoarquiwebjorge.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Delito")
public class Delito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_reportedelito;

    @Column(name = "tipo_delito", length = 100,nullable = false)
    private String tipo_delito;

    @Column(name = "descripcion", length = 200,nullable = false)
    private String descripcion;

    @Column(name = "fecha_hora",length = 50, nullable = false)
    private LocalDateTime fecha_hora;

    @Column(name = "nombre", length = 100,nullable = false)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_zona")
    private Zona zona;

    public Delito() {
    }

    public Delito(int id_reportedelito, String tipo_delito, String descripcion, LocalDateTime fecha_hora, String nombre, Usuario usuario, Zona zona) {
        this.id_reportedelito = id_reportedelito;
        this.tipo_delito = tipo_delito;
        this.descripcion = descripcion;
        this.fecha_hora = fecha_hora;
        this.nombre = nombre;
        this.usuario = usuario;
        this.zona = zona;
    }

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

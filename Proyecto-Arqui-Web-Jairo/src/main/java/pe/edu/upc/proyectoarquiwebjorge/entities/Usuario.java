package pe.edu.upc.proyectoarquiwebjorge.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_usuario;
    @Column(name = "nombre_usuario",length = 50,nullable = false)
    private String nombre_usuario;
    @Column(name = "correo",length = 50,nullable = false)
    private String correo;
    @Column(name = "contra",length = 50,nullable = false)
    private String contra;
    @Column(name = "telefono",length = 50,nullable = false)
    private int telefono;
    @Column(name = "fecha",length = 50,nullable = false)
    private LocalDate fecha;

    public Usuario() {
    }

    public Usuario(int id_usuario, String nombre_usuario, String correo, String contra, int telefono, LocalDate fecha) {
        this.id_usuario = id_usuario;
        this.nombre_usuario = nombre_usuario;
        this.correo = correo;
        this.contra = contra;
        this.telefono = telefono;
        this.fecha = fecha;
    }

    public int getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getNombre_usuario() {
        return nombre_usuario;
    }

    public void setNombre_usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContra() {
        return contra;
    }

    public void setContra(String contra) {
        this.contra = contra;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
}

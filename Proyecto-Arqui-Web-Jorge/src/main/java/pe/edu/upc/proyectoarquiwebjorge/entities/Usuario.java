package pe.edu.upc.proyectoarquiwebjorge.entities;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="Usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id_usuario;

    @Column(name = "nombre",length = 100, nullable = false)
    private String nombre;

    @Column(name = "correo",length = 100, nullable = false)
    private String correo;

    @Column(name = "contraseña", length = 50, nullable = false)
    private String contraseña;

    @Column(name = "telefono", length = 50, nullable = false)
    private int telefono;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    public Usuario() {}

    public Usuario(int id_usuario, String nombre, String correo, String contraseña, int telefono, LocalDate fecha) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.fecha = fecha;
    }

    public int getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
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




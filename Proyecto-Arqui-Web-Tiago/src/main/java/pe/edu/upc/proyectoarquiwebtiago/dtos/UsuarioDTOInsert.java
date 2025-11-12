package pe.edu.upc.proyectoarquiwebtiago.dtos;

import java.time.LocalDate;
import java.util.List;

public class UsuarioDTOInsert {
    private int id_usuario;
    private String nombre;
    private String correo;
    private String contraseña;
    private int telefono;
    private Boolean enabled;
    private LocalDate fecha;
    private List<Integer> rolesIds;


    public List<Integer> getRolesIds() { return rolesIds; }

    public void setRolesIds(List<Integer> rolesIds) { this.rolesIds = rolesIds; }

    public Boolean getEnabled() { return enabled; }

    public void setEnabled(Boolean enabled) { this.enabled = enabled; }

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

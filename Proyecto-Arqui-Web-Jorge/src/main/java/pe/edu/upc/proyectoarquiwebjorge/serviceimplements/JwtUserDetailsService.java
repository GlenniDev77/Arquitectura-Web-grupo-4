package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IUsuarioRepository;

import java.util.ArrayList;
import java.util.List;

public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private IUsuarioRepository usuR;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = usuR.buscarPorNombreUs(username);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("User not exists", username));
        }

        List<GrantedAuthority> roles = new ArrayList<>();

        user.getNombre().forEach(rol -> {
            roles.add(new SimpleGrantedAuthority(rol.getRol()));
        });

        UserDetails ud = new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getEnabled(), true, true, true, roles);

        return ud;
    }
}

package com.poly.gestioncoworkingspace.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF for easier testing in Postman (You can enable it in production)
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                // Permit all for login and logout pages
                .formLogin(form -> form
                        .loginPage("/login")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                )
                // Authorization configuration
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/","/rooms/**","/reservations/**","/subscriptions/**","/members/**").permitAll() // Allow CSRF token endpoint
                        .requestMatchers("/rooms/**", "/reservations/**", "/members/**", "/subscriptions/**").hasRole("ADMIN") // ADMIN-only access
                        .requestMatchers(HttpMethod.GET, "/rooms/**", "/reservations/**").hasAnyRole("USER", "ADMIN")// ADMIN and user access
                        .anyRequest().authenticated() // All other requests require authentication
                )
                // Custom handling for unauthenticated requests
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                        })
                );
        return http.build();
    }

    @Bean
    InMemoryUserDetailsManager userDetailsManager() {
        return new InMemoryUserDetailsManager(
                // Define a USER role
                User.withUsername("user")
                        .password(passwordEncoder().encode("user123")) // Password must be encoded
                        .roles("USER")
                        .build(),
                // Define an ADMIN role with USER privileges
                User.withUsername("admin")
                        .password(passwordEncoder().encode("admin123"))
                        .roles("USER", "ADMIN")
                        .build()
        );
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

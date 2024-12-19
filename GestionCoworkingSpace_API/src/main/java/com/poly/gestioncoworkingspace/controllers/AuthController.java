package com.poly.gestioncoworkingspace.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/csrf-token")
    public CsrfToken csrfToken(HttpServletRequest request) {
        // Retourne le token CSRF
        return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
    }
}

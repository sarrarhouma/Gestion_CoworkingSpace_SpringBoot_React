package com.poly.gestioncoworkingspace.services;

import com.poly.gestioncoworkingspace.entities.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IMemberService {
    // Autres méthodes
    Page<Member> getMembersByMC(String mc, Pageable pageable);
}

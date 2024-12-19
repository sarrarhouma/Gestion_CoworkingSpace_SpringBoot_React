package com.poly.gestioncoworkingspace.repositories;

import com.poly.gestioncoworkingspace.entities.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Page<Member> findByFullNameContains(String mc, Pageable pageable);
}
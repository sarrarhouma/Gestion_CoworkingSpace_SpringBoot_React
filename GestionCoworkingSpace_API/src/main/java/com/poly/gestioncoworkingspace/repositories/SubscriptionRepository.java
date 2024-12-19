package com.poly.gestioncoworkingspace.repositories;

import com.poly.gestioncoworkingspace.entities.Subscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Page<Subscription> findByTypeContains(String mc, Pageable pageable);
}

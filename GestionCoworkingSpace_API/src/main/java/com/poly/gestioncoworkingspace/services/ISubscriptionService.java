package com.poly.gestioncoworkingspace.services;

import com.poly.gestioncoworkingspace.entities.Subscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ISubscriptionService {
    Page<Subscription> getSubscriptionsByMC(String mc, Pageable pageable);
}

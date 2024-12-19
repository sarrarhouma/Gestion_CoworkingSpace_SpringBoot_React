package com.poly.gestioncoworkingspace.services;

import com.poly.gestioncoworkingspace.entities.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IReservationService {
    Page<Reservation> getReservationsByMC(String mc, Pageable pageable);
}

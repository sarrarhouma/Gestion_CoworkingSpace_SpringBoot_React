package com.poly.gestioncoworkingspace.services;

import com.poly.gestioncoworkingspace.entities.MeetingRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IMeetingRoomService {
    Page<MeetingRoom> getRoomsByMC(String mc, Pageable pageable);
}

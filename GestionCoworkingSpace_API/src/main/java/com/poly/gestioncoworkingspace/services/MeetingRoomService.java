package com.poly.gestioncoworkingspace.services;

import com.poly.gestioncoworkingspace.entities.MeetingRoom;
import com.poly.gestioncoworkingspace.repositories.MeetingRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@AllArgsConstructor
@Service
public class MeetingRoomService implements IMeetingRoomService {

    @Autowired
    private MeetingRoomRepository meetingRoomRepository;

    public List<MeetingRoom> getAllRooms() {
        return meetingRoomRepository.findAll();
    }

    public MeetingRoom addRoom(MeetingRoom room) {
        return meetingRoomRepository.save(room);
    }

    public MeetingRoom updateRoom(Long id, MeetingRoom room) {
        return meetingRoomRepository.findById(id).map(existingRoom -> {
            existingRoom.setName(room.getName());
            existingRoom.setCapacity(room.getCapacity());
            existingRoom.setAvailable(room.isAvailable());
            return meetingRoomRepository.save(existingRoom);
        }).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public void deleteRoom(Long id) {
        meetingRoomRepository.deleteById(id);
    }

    public MeetingRoom getRoomById(Long id) {
        return meetingRoomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room with ID " + id + " not found"));
    }

    @Override
    public Page<MeetingRoom> getRoomsByMC(String mc, Pageable pageable) {
        return meetingRoomRepository.findByNameContains(mc, pageable);
    }
}

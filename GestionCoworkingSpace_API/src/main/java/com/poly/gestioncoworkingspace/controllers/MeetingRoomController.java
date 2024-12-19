package com.poly.gestioncoworkingspace.controllers;

import com.poly.gestioncoworkingspace.entities.MeetingRoom;
import com.poly.gestioncoworkingspace.services.MeetingRoomService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/rooms")
public class MeetingRoomController {

    @Autowired
    private final MeetingRoomService meetingRoomService;

    // Méthode avec pagination et recherche par mot-clé (mapping distinct)
    @GetMapping("/search")
    public ResponseEntity<List<MeetingRoom>> getRoomsByMC(@RequestParam(name = "mc", defaultValue = "") String mc,
                                                          @RequestParam(name = "page", defaultValue = "1") int page,
                                                          @RequestParam(name = "size", defaultValue = "5") int size) {
        var rooms = meetingRoomService.getRoomsByMC(mc, PageRequest.of(page - 1, size));
        return new ResponseEntity<>(rooms.getContent(), HttpStatus.OK);
    }

    // Récupérer toutes les salles de réunion
    @GetMapping
    public ResponseEntity<List<MeetingRoom>> listMeetingRooms() {
        List<MeetingRoom> rooms = meetingRoomService.getAllRooms();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }
    // Récupérer une salle par ID
    @GetMapping("/{id}")
    public ResponseEntity<MeetingRoom> getMeetingRoomById(@PathVariable Long id) {
        MeetingRoom room = meetingRoomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }

    // Ajouter une nouvelle salle de réunion
    @PostMapping("/add")
    public ResponseEntity<MeetingRoom> addMeetingRoom(@RequestBody MeetingRoom room) {
        MeetingRoom savedRoom = meetingRoomService.addRoom(room);
        return new ResponseEntity<>(savedRoom, HttpStatus.CREATED);
    }

    // Modifier une salle existante
    @PutMapping("/edit/{id}")
    public ResponseEntity<MeetingRoom> editMeetingRoom(@PathVariable Long id, @RequestBody MeetingRoom room) {
        room.setId(id); // Associe l'ID existant pour éviter la création d'une nouvelle salle
        MeetingRoom updatedRoom = meetingRoomService.updateRoom(id, room);
        return new ResponseEntity<>(updatedRoom, HttpStatus.OK);
    }

    // Supprimer une salle
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMeetingRoom(@PathVariable Long id) {
        meetingRoomService.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

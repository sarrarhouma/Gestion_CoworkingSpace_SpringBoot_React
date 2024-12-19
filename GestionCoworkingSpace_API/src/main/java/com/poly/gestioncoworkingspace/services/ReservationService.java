package com.poly.gestioncoworkingspace.services;

import com.poly.gestioncoworkingspace.entities.MeetingRoom;
import com.poly.gestioncoworkingspace.entities.Member;
import com.poly.gestioncoworkingspace.entities.Reservation;
import com.poly.gestioncoworkingspace.repositories.MeetingRoomRepository;
import com.poly.gestioncoworkingspace.repositories.MemberRepository;
import com.poly.gestioncoworkingspace.repositories.ReservationRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class ReservationService {
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);

    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final MeetingRoomRepository meetingRoomRepository;

    public List<Reservation> getAllReservations() {
        logger.info("Fetching all reservations...");
        return reservationRepository.findAll();
    }

    @Transactional
    public Reservation addReservation(Reservation reservation) {
        logger.info("Adding a new reservation: {}", reservation);

        // Fetch and assign the member
        if (reservation.getMember() != null && reservation.getMember().getId() != null) {
            Member member = memberRepository.findById(reservation.getMember().getId())
                    .orElseThrow(() -> new RuntimeException("Member not found with ID: " + reservation.getMember().getId()));
            reservation.setMember(member);
        } else {
            throw new RuntimeException("Member information is required for a reservation.");
        }

        // Fetch and assign the meeting room
        if (reservation.getMeetingRoom() != null && reservation.getMeetingRoom().getId() != null) {
            MeetingRoom meetingRoom = meetingRoomRepository.findById(reservation.getMeetingRoom().getId())
                    .orElseThrow(() -> new RuntimeException("Meeting Room not found with ID: " + reservation.getMeetingRoom().getId()));
            reservation.setMeetingRoom(meetingRoom);
        } else {
            throw new RuntimeException("Meeting Room information is required for a reservation.");
        }

        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Long id) {
        logger.info("Deleting reservation with ID: {}", id);
        reservationRepository.deleteById(id);
    }

    public Reservation getReservationById(Long id) {
        logger.info("Fetching reservation with ID: {}", id);
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation with ID " + id + " not found"));
    }

    @Transactional
    public Reservation updateReservation(Long id, Reservation reservation) {
        logger.info("Updating reservation with ID: {}", id);

        return reservationRepository.findById(id).map(existingReservation -> {
            // Update member
            if (reservation.getMember() != null && reservation.getMember().getId() != null) {
                Member member = memberRepository.findById(reservation.getMember().getId())
                        .orElseThrow(() -> new RuntimeException("Member not found with ID: " + reservation.getMember().getId()));
                existingReservation.setMember(member);
            }

            // Update meeting room
            if (reservation.getMeetingRoom() != null && reservation.getMeetingRoom().getId() != null) {
                MeetingRoom meetingRoom = meetingRoomRepository.findById(reservation.getMeetingRoom().getId())
                        .orElseThrow(() -> new RuntimeException("Meeting Room not found with ID: " + reservation.getMeetingRoom().getId()));
                existingReservation.setMeetingRoom(meetingRoom);
            }

            // Update start and end times
            existingReservation.setStartTime(reservation.getStartTime());
            existingReservation.setEndTime(reservation.getEndTime());

            return reservationRepository.save(existingReservation);
        }).orElseThrow(() -> new RuntimeException("Reservation with ID " + id + " not found"));
    }
}

package com.poly.gestioncoworkingspace.repositories;

import com.poly.gestioncoworkingspace.entities.MeetingRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Long> {
    @Query("SELECT r FROM MeetingRoom r WHERE r.name LIKE %:mc%")
    Page<MeetingRoom> findByNameContains(@Param("mc") String mc, Pageable pageable);
}
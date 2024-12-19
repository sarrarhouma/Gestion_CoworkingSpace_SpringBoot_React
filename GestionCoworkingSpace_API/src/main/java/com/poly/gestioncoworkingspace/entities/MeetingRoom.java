package com.poly.gestioncoworkingspace.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Entity
@Getter
@Setter
public class MeetingRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int capacity;
    private boolean isAvailable;

    @JsonIgnore // Prevent infinite recursion
    @ManyToMany(mappedBy = "reservedRooms")
    private List<Member> members;


}

package com.poly.gestioncoworkingspace.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDate;
@Data
@Entity
@Getter
@Setter
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // Weekly, Monthly, Annual
    private double price;
    private LocalDate startDate;
    private LocalDate endDate;
    @JsonIgnore
    @OneToOne(mappedBy = "subscription", cascade = CascadeType.ALL)
    private Member member;


}

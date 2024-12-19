package com.poly.gestioncoworkingspace.services;

import com.poly.gestioncoworkingspace.entities.MeetingRoom;
import com.poly.gestioncoworkingspace.entities.Member;
import com.poly.gestioncoworkingspace.entities.Subscription;
import com.poly.gestioncoworkingspace.repositories.MeetingRoomRepository;
import com.poly.gestioncoworkingspace.repositories.MemberRepository;
import com.poly.gestioncoworkingspace.repositories.SubscriptionRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@AllArgsConstructor
@Service
public class MemberService {
    private static final Logger logger = LoggerFactory.getLogger(MemberService.class);

    @Autowired
    private final MemberRepository memberRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final MeetingRoomRepository meetingRoomRepository;

    public List<Member> getAllMembers() {
        logger.info("Fetching all members...");
        return memberRepository.findAll();
    }

    @Transactional
    public Member addMember(Member member) {
        logger.info("Adding a new member: {}", member);

        // Fetch and set subscription if provided
        if (member.getSubscription() != null && member.getSubscription().getId() != null) {
            Subscription subscription = subscriptionRepository.findById(member.getSubscription().getId())
                    .orElseThrow(() -> new RuntimeException("Subscription not found with ID: " + member.getSubscription().getId()));
            member.setSubscription(subscription);
        }

        // Fetch and set meeting rooms if provided
        if (member.getReservedRooms() != null && !member.getReservedRooms().isEmpty()) {
            List<MeetingRoom> rooms = meetingRoomRepository.findAllById(
                    member.getReservedRooms().stream().map(MeetingRoom::getId).toList()
            );
            member.setReservedRooms(rooms);
        }

        // Save the member
        return memberRepository.save(member);
    }

    public void deleteMember(Long id) {
        logger.info("Deleting member with ID: {}", id);
        memberRepository.deleteById(id);
    }

    public Member getMemberById(Long id) {
        logger.info("Fetching member with ID: {}", id);
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member with ID " + id + " not found"));
    }

    @Transactional
    public Member updateMember(Long id, Member member) {
        logger.info("Updating member with ID: {}", id);

        return memberRepository.findById(id).map(existingMember -> {
            // Update basic fields
            existingMember.setFullName(member.getFullName());
            existingMember.setEmail(member.getEmail());
            existingMember.setPhoneNumber(member.getPhoneNumber());

            // Update subscription
            if (member.getSubscription() != null && member.getSubscription().getId() != null) {
                Subscription subscription = subscriptionRepository.findById(member.getSubscription().getId())
                        .orElseThrow(() -> new RuntimeException("Subscription not found with ID: " + member.getSubscription().getId()));
                existingMember.setSubscription(subscription);
            } else {
                existingMember.setSubscription(null); // Clear subscription if not provided
            }

            // Update reserved rooms
            if (member.getReservedRooms() != null && !member.getReservedRooms().isEmpty()) {
                List<MeetingRoom> rooms = meetingRoomRepository.findAllById(
                        member.getReservedRooms().stream().map(MeetingRoom::getId).toList()
                );
                existingMember.setReservedRooms(rooms);
            } else {
                existingMember.setReservedRooms(null); // Clear reserved rooms if not provided
            }

            return memberRepository.save(existingMember);
        }).orElseThrow(() -> new RuntimeException("Member with ID " + id + " not found"));
    }

    public Page<Member> getMembersByMC(String mc, Pageable pageable) {
        logger.info("Fetching members by keyword: {}", mc);
        return memberRepository.findByFullNameContains(mc, pageable);
    }
}

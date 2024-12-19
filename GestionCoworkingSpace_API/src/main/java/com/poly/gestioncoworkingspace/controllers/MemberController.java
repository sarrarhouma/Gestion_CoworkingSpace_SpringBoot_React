package com.poly.gestioncoworkingspace.controllers;

import com.poly.gestioncoworkingspace.entities.MeetingRoom;
import com.poly.gestioncoworkingspace.entities.Member;
import com.poly.gestioncoworkingspace.entities.Subscription;
import com.poly.gestioncoworkingspace.services.MemberService;
import com.poly.gestioncoworkingspace.repositories.SubscriptionRepository;
import com.poly.gestioncoworkingspace.repositories.MeetingRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController // Use RestController for REST APIs instead of Controller
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final SubscriptionRepository subscriptionRepository; // Inject SubscriptionRepository
    private final MeetingRoomRepository meetingRoomRepository; // Inject MeetingRoomRepository

    @GetMapping("/search")
    public ResponseEntity<List<Member>> getMembersByMC(@RequestParam(name = "mc", defaultValue = "") String mc,
                                                       @RequestParam(name = "page", defaultValue = "1") int page,
                                                       @RequestParam(name = "size", defaultValue = "5") int size) {
        var members = memberService.getMembersByMC(mc, PageRequest.of(page - 1, size));
        return new ResponseEntity<>(members.getContent(), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Member>> listMembers() {
        List<Member> members = memberService.getAllMembers();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Member> addMember(@RequestBody Member member) {
        // Fetch and set the subscription if provided
        if (member.getSubscription() != null && member.getSubscription().getId() != null) {
            Subscription subscription = subscriptionRepository.findById(member.getSubscription().getId())
                    .orElseThrow(() -> new RuntimeException("Subscription not found with ID: " + member.getSubscription().getId()));
            member.setSubscription(subscription);
        }

        // Fetch and set reserved rooms if provided
        if (member.getReservedRooms() != null && !member.getReservedRooms().isEmpty()) {
            List<MeetingRoom> rooms = meetingRoomRepository.findAllById(
                    member.getReservedRooms().stream().map(MeetingRoom::getId).toList()
            );
            member.setReservedRooms(rooms);
        }

        // Save the member
        Member savedMember = memberService.addMember(member);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }



    @PutMapping("/edit/{id}")
    public ResponseEntity<Member> editMember(@PathVariable Long id, @RequestBody Member member) {
        member.setId(id);
        Member updatedMember = memberService.updateMember(id, member);
        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.poly.gestioncoworkingspace.controllers;

import com.poly.gestioncoworkingspace.entities.Subscription;
import com.poly.gestioncoworkingspace.services.SubscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    // Méthode de recherche avec pagination par mot-clé (mc)
    @GetMapping("/search")
    public ResponseEntity<List<Subscription>> getSubscriptionsByMC(@RequestParam(name = "mc", defaultValue = "") String mc,
                                                                   @RequestParam(name = "page", defaultValue = "1") int page,
                                                                   @RequestParam(name = "size", defaultValue = "5") int size) {
        var subscriptions = subscriptionService.getSubscriptionsByMC(mc, PageRequest.of(page - 1, size));
        return new ResponseEntity<>(subscriptions.getContent(), HttpStatus.OK);
    }

    // Afficher tous les abonnements (sans recherche ni pagination)
    @GetMapping
    public ResponseEntity<List<Subscription>> listSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        return new ResponseEntity<>(subscriptions, HttpStatus.OK);
    }

    // Ajouter un nouvel abonnement
    @PostMapping("/add")
    public ResponseEntity<Subscription> addSubscription(@RequestBody Subscription subscription) {
        Subscription savedSubscription = subscriptionService.addSubscription(subscription);
        return new ResponseEntity<>(savedSubscription, HttpStatus.CREATED);
    }


    // Modifier un abonnement existant
    @PutMapping("/edit/{id}")
    public ResponseEntity<Subscription> editSubscription(@PathVariable Long id, @RequestBody Subscription subscription) {
        subscription.setId(id); // Associe l'ID existant pour éviter la création d'un nouvel abonnement
        Subscription updatedSubscription = subscriptionService.updateSubscription(id, subscription);
        return new ResponseEntity<>(updatedSubscription, HttpStatus.OK);
    }

    // Supprimer un abonnement
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSubscription(@PathVariable Long id) {
        subscriptionService.deleteSubscription(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

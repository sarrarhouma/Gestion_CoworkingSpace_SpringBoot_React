package com.poly.gestioncoworkingspace.services;

import com.poly.gestioncoworkingspace.entities.Subscription;
import com.poly.gestioncoworkingspace.repositories.SubscriptionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public Subscription getSubscriptionById(Long id) {
        return subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription with ID " + id + " not found"));
    }

    public Subscription addSubscription(Subscription subscription) {
        return subscriptionRepository.save(subscription);
    }

    public Subscription updateSubscription(Long id, Subscription subscription) {
        subscriptionRepository.findById(id).map(existingSub -> {
            existingSub.setType(subscription.getType());
            existingSub.setPrice(subscription.getPrice());
            existingSub.setStartDate(subscription.getStartDate());
            existingSub.setEndDate(subscription.getEndDate());
            return subscriptionRepository.save(existingSub);
        }).orElseThrow(() -> new RuntimeException("Subscription with ID " + id + " not found"));
        return subscription;
    }

    public void deleteSubscription(Long id) {
        subscriptionRepository.deleteById(id);
    }
    public Page<Subscription> getSubscriptionsByMC(String mc, Pageable pageable) {
        return subscriptionRepository.findByTypeContains(mc, pageable);
    }
}

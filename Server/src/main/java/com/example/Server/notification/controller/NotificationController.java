package com.example.Server.notification.controller;

import com.example.Server.notification.model.dto.CreateNotificationDTO;
import com.example.Server.notification.model.dto.NotificationDTO;
import com.example.Server.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // GET /api/users/{userId}/notifications
    @GetMapping("/users/{userId}/notifications")
    public Page<NotificationDTO> getUserNotifications(
            @PathVariable Long userId,
            @RequestParam Optional<Boolean> read,
            Pageable pageable
    ) {
        return notificationService.getNotifications(userId, read, pageable);
    }

    // POST /api/notifications
    @PostMapping("/notifications")
    public NotificationDTO createNotification(@RequestBody CreateNotificationDTO dto) {
        return notificationService.createNotification(dto);
    }

    // PUT /api/notifications/{id}/read
    @PutMapping("/notifications/{id}/read")
    public NotificationDTO markNotificationAsRead(@PathVariable Long id) {
        return notificationService.markAsRead(id);
    }
}

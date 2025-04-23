package com.example.Server.service;

import com.example.Server.dto.CreateNotificationDTO;
import com.example.Server.dto.NotificationDTO;
import com.example.Server.model.Notification;
import com.example.Server.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Page<NotificationDTO> getNotifications(Long userId, Optional<Boolean> readFilter, Pageable pageable) {
        Page<Notification> notifications = readFilter.isPresent()
                ? notificationRepository.findByUserIdAndRead(userId, readFilter.get(), pageable)
                : notificationRepository.findByUserId(userId, pageable);

        return notifications.map(this::toDto);
    }

    public NotificationDTO createNotification(CreateNotificationDTO dto) {
        Notification notification = new Notification();
        notification.setUserId(dto.getUserId());
        notification.setMessage(dto.getMessage());
        notification.setTimestamp(ZonedDateTime.now());
        notification.setRead(false);

        Notification saved = notificationRepository.save(notification);
        return toDto(saved);
    }

    public NotificationDTO markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);
        Notification updated = notificationRepository.save(notification);

        return toDto(updated);
    }

    private NotificationDTO toDto(Notification n) {
        return new NotificationDTO(
                n.getId(),
                n.getUserId(),
                n.getMessage(),
                n.getTimestamp().toString(),
                n.isRead()
        );
    }
}

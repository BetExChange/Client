package com.example.Server.dto;

import java.time.ZonedDateTime;

public class NotificationDTO {
    private Long id;
    private Long userId;
    private String message;
    private ZonedDateTime timestamp;
    private boolean read;

    public NotificationDTO() {
    }

    public NotificationDTO(Long id, Long userId, String message, ZonedDateTime timestamp, boolean read) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.timestamp = timestamp;
        this.read = read;
    }

    public NotificationDTO(Long id, Long userId, String message, String string, boolean read) {
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
}

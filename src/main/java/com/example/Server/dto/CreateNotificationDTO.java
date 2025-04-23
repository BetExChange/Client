package com.example.Server.dto;

public class CreateNotificationDTO {
    private Long userId;
    private String message;

    public CreateNotificationDTO() {
    }

    public CreateNotificationDTO(Long userId, String message) {
        this.userId = userId;
        this.message = message;
    }

    // Getters and setters

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
}

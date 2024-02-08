package com.gruppe24.backend.dto;

/**
 * Represents a Game-Data Transfer Object.
 * <p>
 * This class carries information from the json-object retrieved from the frontend.
 * </p>
 */
public class GameDTO {

    private String name;
    private String description;
    private int players;
    private int duration;
    private int category;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPlayers() {
        return players;
    }

    public void setPlayers(int players) {
        this.players = players;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

}

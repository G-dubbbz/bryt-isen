package com.gruppe24.backend.dto;

/**
 * Represents a Category-Data Transfer Object.
 * <p>
 * This class carries information from the json-object retrieved from the
 * frontend.
 * </p>
 */
public class CategoryDTO {

    // TODO: skal den være med selv om det er primærnøkkel?
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

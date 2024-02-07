package com.gruppe24.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DefaultController {

    @GetMapping("/")
    public String index() {
        return "Hello World";
    }

    @GetMapping("/secured")
    public String secured() {
        return "Hello, secured!";
    }
}

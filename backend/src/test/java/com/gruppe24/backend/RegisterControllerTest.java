package com.gruppe24.backend;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gruppe24.backend.controller.RegisterController;
import com.gruppe24.backend.dto.UserDTO;
import com.gruppe24.backend.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.mockito.MockitoAnnotations;

public class RegisterControllerTest {

    private MockMvc mockMvc;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private UserService userService;

    @InjectMocks
    private RegisterController registerController;

    @BeforeEach
    public void setup() {
        // Initialize Mockito annotations
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(registerController).build();
    }

    @Test
    public void registerUserAccount_ShouldReturnSeeOtherOnSuccess() throws Exception {
        UserDTO userDTO = new UserDTO(); // Set properties accordingly
        String json = objectMapper.writeValueAsString(userDTO);

        MediaType mediaType = MediaType.APPLICATION_JSON;
        if (mediaType != null) {
            mockMvc.perform(post("/register")
                    .contentType(mediaType)
                    .content(json != null ? json : ""))
                    .andExpect(status().isSeeOther())
                    .andExpect(header().string("Location", "/secured"));
        }

        verify(userService, times(1)).createUser(any(UserDTO.class));
    }
}

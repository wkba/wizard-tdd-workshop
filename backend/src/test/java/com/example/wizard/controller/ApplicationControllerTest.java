package com.example.wizard.controller;

import com.example.wizard.repository.ApplicationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class ApplicationControllerTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ApplicationRepository repository;

    @BeforeEach
    void setUp() {
        repository.deleteAll();
    }

    @Test
    void 正常な申し込みデータを送信すると201で保存される() throws Exception {
        String json = """
                {
                    "name": "山田 太郎",
                    "email": "taro@example.com",
                    "phone": "090-1234-5678",
                    "plan": "standard"
                }
                """;

        mockMvc.perform(post("/api/applications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("山田 太郎"))
                .andExpect(jsonPath("$.plan").value("standard"))
                .andExpect(jsonPath("$.id").isNumber());

        assertThat(repository.count()).isEqualTo(1);
    }

    @Test
    void 氏名が空の場合は400エラーが返る() throws Exception {
        String json = """
                {
                    "name": "",
                    "email": "taro@example.com",
                    "phone": "090-1234-5678",
                    "plan": "standard"
                }
                """;

        mockMvc.perform(post("/api/applications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("氏名は必須です"));

        assertThat(repository.count()).isZero();
    }

    @Test
    void プランが未指定の場合は400エラーが返る() throws Exception {
        String json = """
                {
                    "name": "山田 太郎",
                    "email": "taro@example.com",
                    "phone": "090-1234-5678",
                    "plan": ""
                }
                """;

        mockMvc.perform(post("/api/applications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("プランは必須です"));

        assertThat(repository.count()).isZero();
    }
}

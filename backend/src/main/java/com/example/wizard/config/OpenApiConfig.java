package com.example.wizard.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI wizardOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Wizard Application API")
                        .description("ウィザード形式の申し込みシステム API")
                        .version("0.1.0"));
    }
}

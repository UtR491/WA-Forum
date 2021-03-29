package com.waforum.backend;

import com.waforum.backend.assemblers.PostsAssembler;
import com.waforum.backend.assemblers.ProfileAssembler;
import com.waforum.backend.filters.JwtRequestFilter;
import com.waforum.backend.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public JwtRequestFilter getJwtRequestFilter() {
		return new JwtRequestFilter();
	}

	@Bean
	public PostsAssembler getPostsAssembler() {
		return new PostsAssembler();
	}

	@Bean
	public ProfileAssembler getProfileAssembler() {
		return new ProfileAssembler();
	}
}

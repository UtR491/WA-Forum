package com.waforum.backend;

import com.waforum.backend.assemblers.CommentsAssembler;
import com.waforum.backend.assemblers.PostsAssembler;
import com.waforum.backend.assemblers.ProfileAssembler;
import com.waforum.backend.assemblers.QuestionWithAllAnswerWrapperAssembler;
import com.waforum.backend.assemblers.SingleAnswerAllCommentsWrapperAssembler;
import com.waforum.backend.assemblers.SingleQuestionAnswerWrapperAssembler;
import com.waforum.backend.filters.JwtRequestFilter;
import com.waforum.backend.models.QuestionWithAllAnswerWrapper;
import com.waforum.backend.models.SingleAnswerAllCommentsWrapper;
import com.waforum.backend.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
@EnableScheduling
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

	@Bean
	public CommentsAssembler getCommentsAssembler() {
		return new CommentsAssembler();
	}

	@Bean
	public QuestionWithAllAnswerWrapperAssembler getQuestionWithAllAnswerWrapperAssembler() {
		return new QuestionWithAllAnswerWrapperAssembler();
	}

	@Bean
	public SingleAnswerAllCommentsWrapperAssembler getSingleAnswerAllCommentsWrapperAssembler() {
	    return new SingleAnswerAllCommentsWrapperAssembler();
	}

	@Bean
	public SingleQuestionAnswerWrapperAssembler getSingleQuestionAnswerWrapperAssembler() {
		return new SingleQuestionAnswerWrapperAssembler();
	}
}

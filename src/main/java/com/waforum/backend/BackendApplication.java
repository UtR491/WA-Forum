package com.waforum.backend;

import com.waforum.backend.assemblers.*;
import com.waforum.backend.filters.JwtRequestFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableElasticsearchRepositories(basePackages = "com.waforum.backend.elasticrepository")
@EnableJpaRepositories(basePackages = "com.waforum.backend.repository")
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
	@Bean
	public FollowersAssembler getFollowersAssembler(){
		return new FollowersAssembler();
	}
	@Bean
	public FollowingAssembler getFollowingAssembler(){
		return new FollowingAssembler();
	}
}

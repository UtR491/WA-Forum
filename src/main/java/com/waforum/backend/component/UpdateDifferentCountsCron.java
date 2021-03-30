package com.waforum.backend.component;

import com.waforum.backend.models.Posts;
import com.waforum.backend.repository.PostsRepository;
import com.waforum.backend.repository.VotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class UpdateDifferentCountsCron {

    @Autowired
    PostsRepository postsRepository;

    @Autowired
    VotesRepository votesRepository;

    @Scheduled(cron = "0/15 * * ? * *") // updates every 15 seconds.
    public void updateVotesCount() {
        System.out.println("Updating votes count at " + new SimpleDateFormat().format(new Date()));
        System.out.println("All posts are " + postsRepository.findAll());
        List<Posts> allPosts = postsRepository.findAll();
        for(Posts post : allPosts) {
            post.setUpvoteCount(
                    votesRepository.findAllByPostIdAndTypeOf(post.getId(), 1).size()
                            - votesRepository.findAllByPostIdAndTypeOf(post.getId(), -1).size());
            System.out.println("new post = " + post);
            System.out.println("Saving it in the repo");
            postsRepository.save(post);
        }
    }
}

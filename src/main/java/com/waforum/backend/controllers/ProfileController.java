package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.*;
import com.waforum.backend.exceptions.*;
import com.waforum.backend.models.*;
import com.waforum.backend.repository.FollowersRepository;
import com.waforum.backend.repository.FollowingRepository;
import com.waforum.backend.repository.PostsRepository;
import com.waforum.backend.repository.UserRepository;
import com.waforum.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class ProfileController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PostsRepository postsRepository;

    @Autowired
    ProfileAssembler profileAssembler;

    @Autowired
    PostsAssembler postsAssembler;


    @Autowired
    SingleQuestionAnswerWrapperAssembler singleQuestionAnswerWrapperAssembler;

    @Autowired
    FollowingRepository followingRepository;

    @Autowired
    FollowersRepository followersRepository;

    @Autowired
    FollowersAssembler followersAssembler;

    @Autowired
    FollowingAssembler followingAssembler;

    @Autowired
    JwtUtil jwtUtil;


    @GetMapping("/profile/{id}")
    public EntityModel<User> getProfileInfoById(@PathVariable Integer id) {
        return profileAssembler.toModel(userRepository.findById(id).orElseThrow(() -> new ProfileNotFoundException(id)));
    }

    //method to show all the questions asked by the user
    @GetMapping("/profile/{id}/questions")
    public CollectionModel<EntityModel<Posts>> getQuestionsByUserId(@PathVariable Integer id) {
        List<EntityModel<Posts>> questions = postsRepository.findAllByPostTypeIdAndOwnerUserId(1, id).stream().
                map((ques) -> postsAssembler.toModel(ques)).collect(Collectors.toList());
        return CollectionModel.of(questions,
                linkTo(methodOn(ProfileController.class).getQuestionsByUserId(id)).withSelfRel(),
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"));
    }

    @GetMapping("/profile/{id}/answers")
    public CollectionModel<EntityModel<SingleQuestionAnswerWrapper>> getAnswersById(@PathVariable Integer id) {
        List<SingleQuestionAnswerWrapper>wrappers=new ArrayList<>();
        for (Posts ans: postsRepository.findAllByPostTypeIdAndOwnerUserId(2, id)) {
            wrappers.add(new SingleQuestionAnswerWrapper(
                    postsRepository.findById(ans.getParentId()).orElseThrow(()->new QuestionNotFoundException(ans.getParentId())), ans));
        }
        List<EntityModel<SingleQuestionAnswerWrapper>> wrapperEntityModel=wrappers.stream().map(w->singleQuestionAnswerWrapperAssembler.toModel(w)).collect(Collectors.toList());
        return CollectionModel.of(wrapperEntityModel,
                linkTo(methodOn(ProfileController.class)).withSelfRel(),
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"),
                linkTo(methodOn(ProfileController.class).getProfileInfoById(id)).withRel("userProfile"));
    }
    @PutMapping("/profile/{id}/questions/{qid}/answers/{aid}")
    public ResponseEntity<?> acceptAnswer(@PathVariable Integer id, @PathVariable Integer qid, @PathVariable Integer aid){
        if(postsRepository.findById(qid).orElseThrow(()->new QuestionNotFoundException(qid)).getAcceptedAnswerId()==null){
            postsRepository.findById(qid).orElseThrow(()->new QuestionNotFoundException(qid)).setAcceptedAnswerId(aid);
            return ResponseEntity.noContent().build();
        }
        else throw new AnswerNotAcceptedException(qid,aid);
    }

    @GetMapping("/profile/{id}/followers")
    public CollectionModel<EntityModel<Followers>>getFollowersById(@PathVariable Integer id){
        List<EntityModel<Followers>>followerList= followersRepository.findAllByUserId(id).stream().
                map(fr->followersAssembler.toModel(fr)).collect(Collectors.toList());
        return CollectionModel.of(followerList,
                linkTo(methodOn(ProfileController.class).getFollowersById(id)).withSelfRel(),
                linkTo(methodOn(ProfileController.class).getProfileInfoById(id)).withRel("userProfile"));
    }

    @GetMapping("/profile/{id}/following")
    public CollectionModel<EntityModel<Following>>getFollowingById(@PathVariable Integer id){
        List<EntityModel<Following>>followingList=followingRepository.findAllByUserId(id).stream().
                map(fg->followingAssembler.toModel(fg)).collect(Collectors.toList());
        return CollectionModel.of(followingList,
                linkTo(methodOn(ProfileController.class).getFollowingById(id)).withSelfRel(),
                linkTo(methodOn(ProfileController.class).getProfileInfoById(id)).withRel("userProfile"));
    }

    @PostMapping("/profile/{id}/follow")
    public ResponseEntity<?>follow(@PathVariable Integer id){
        Integer userId=userRepository.findByRegistrationNumber(Integer.parseInt(jwtUtil.extractRegistrationNumber((String) SecurityContextHolder.getContext().getAuthentication().getCredentials()))).getId();
        if (userId.equals(id))throw new CanNotFollowException(id);
        else {
            followersRepository.save(new Followers(id,userId));
            followingRepository.save(new Following(userId,id));
            return ResponseEntity.noContent().build();
        }
    }
    @PostMapping("/profile/{id}/edit")
    public ResponseEntity<?>editProfile(@PathVariable Integer id,@RequestBody User editedProfile){
        Integer userId=userRepository.findByRegistrationNumber(Integer.parseInt(jwtUtil.extractRegistrationNumber((String) SecurityContextHolder.getContext().getAuthentication().getCredentials()))).getId();
        if(!userId.equals(id))throw new CanNotEditProfileException();
        else {
            User oldProfile = userRepository.findById(id).orElseThrow(() -> new ProfileNotFoundException(id));
            oldProfile.setDisplayName(editedProfile.getDisplayName());
            oldProfile.setAboutMe(editedProfile.getAboutMe());
            oldProfile.setCodechef(editedProfile.getCodechef());
            oldProfile.setCodeforces(editedProfile.getCodeforces());
            oldProfile.setGithub(editedProfile.getGithub());
            oldProfile.setEmail(editedProfile.getEmail());
            userRepository.save(oldProfile);
            return ResponseEntity.noContent().build();
        }
    }
}

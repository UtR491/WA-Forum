package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.*;
import com.waforum.backend.exceptions.*;
import com.waforum.backend.models.*;
import com.waforum.backend.repository.FollowersRepository;
import com.waforum.backend.repository.FollowingRepository;
import com.waforum.backend.repository.PostsRepository;
import com.waforum.backend.repository.UserRepository;
import com.waforum.backend.util.JwtUtil;
import com.waforum.backend.util.PostsUtil;
import com.waforum.backend.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api")
public class UserProfileController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PostsRepository postsRepository;

    @Autowired
    ProfileAssembler profileAssembler;

    @Autowired
    PostsAssembler postsAssembler;

    @Autowired
    PostsUtil postsUtil;

    @Autowired
    UserUtil userUtil;

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
        User user = userRepository.findById(id).orElseThrow(() -> new ProfileNotFoundException(id));
        userUtil.setFollowStatus(user, null);
        userUtil.setIsItYou(user);
        return profileAssembler.toModel(user);
    }

    @GetMapping(value = "/profile/summaries", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findAllUserSummaries() {
        UserDetailsImpl userDetails = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return ResponseEntity.ok(userRepository
                .findAll()
                .stream()
                .filter(user -> !user.getRegistrationNumber().equals(userDetails.getRegistrationNumber()))
                .map(user -> profileAssembler.toModel(user)));
    }

    //method to show all the questions asked by the user
    @GetMapping("/profile/{id}/questions")
    public CollectionModel<EntityModel<Posts>> getQuestionsByUserId(@PathVariable Integer id) {
        List<EntityModel<Posts>> questions = postsRepository.findAllByPostTypeIdAndOwnerUserId(1, id).stream().
                map((ques) -> {
                    postsUtil.setVoteStatus(ques, null);
                    postsUtil.setPostTags(ques);
                    return postsAssembler.toModel(ques);
                }).collect(Collectors.toList());
        return CollectionModel.of(questions,
                linkTo(methodOn(UserProfileController.class).getQuestionsByUserId(id)).withSelfRel(),
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"));
    }

    @GetMapping("/profile/{id}/answers")
    public CollectionModel<EntityModel<SingleQuestionAnswerWrapper>> getAnswersById(@PathVariable Integer id) {
        List<SingleQuestionAnswerWrapper>wrappers=new ArrayList<>();
        for (Posts ans: postsRepository.findAllByPostTypeIdAndOwnerUserId(2, id)) {
            wrappers.add(new SingleQuestionAnswerWrapper(
                    postsAssembler.toModel(postsRepository.findById(ans.getParentId()).orElseThrow(()->new QuestionNotFoundException(ans.getParentId()))), postsAssembler.toModel(ans)));
        }
        List<EntityModel<SingleQuestionAnswerWrapper>> wrapperEntityModel=wrappers.stream().map(w->singleQuestionAnswerWrapperAssembler.toModel(w)).collect(Collectors.toList());
        return CollectionModel.of(wrapperEntityModel,
                linkTo(methodOn(UserProfileController.class).getAnswersById(id)).withSelfRel(),
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(id)).withRel("userProfile"));
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
                map(fr->{
                    fr.setName(userRepository.findById(fr.getFollowerId()).orElseThrow(() -> new ProfileNotFoundException(fr.getFollowerId())).getDisplayName());
                    return followersAssembler.toModel(fr);
                }).collect(Collectors.toList());
        return CollectionModel.of(followerList,
                linkTo(methodOn(UserProfileController.class).getFollowersById(id)).withSelfRel(),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(id)).withRel("userProfile"));
    }

    @GetMapping("/profile/{id}/following")
    public CollectionModel<EntityModel<Following>>getFollowingById(@PathVariable Integer id){
        List<EntityModel<Following>>followingList=followingRepository.findAllByUserId(id).stream().
                map(fg->{
                    fg.setName(userRepository.findById(fg.getFollowingId()).orElseThrow(() -> new ProfileNotFoundException(fg.getFollowingId())).getDisplayName());
                    return followingAssembler.toModel(fg);
                }).collect(Collectors.toList());
        return CollectionModel.of(followingList,
                linkTo(methodOn(UserProfileController.class).getFollowingById(id)).withSelfRel(),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(id)).withRel("userProfile"));
    }

    @PostMapping("/profile/{id}/follow")
    public ResponseEntity<?>follow(@PathVariable Integer id){
        UserDetailsImpl user=((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        if (user.getId().equals(id))throw new CanNotFollowException(id);
        else {
            try {
                followersRepository.save(new Followers(id,user.getId()));
                followingRepository.save(new Following(user.getId(),id));
            } catch (Exception e) { // if it already exists and has been clicked again, it means unfollow.
                followersRepository.delete(followersRepository.findByUserIdAndFollowerId(id, user.getId()));
                followingRepository.delete(followingRepository.findByUserIdAndFollowingId(user.getId(), id));
            }
            return ResponseEntity.noContent().build();
        }
    }
    @PostMapping("/profile/{id}/edit")
    public ResponseEntity<?>editProfile(@PathVariable Integer id,@RequestBody User editedProfile){
        UserDetailsImpl user=((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Integer userId=user.getId();
        if(!userId.equals(id))throw new CanNotEditProfileException();
        else {
            User oldProfile = userRepository.findById(id).orElseThrow(() -> new ProfileNotFoundException(id));
            if(!editedProfile.getDisplayName().equals("")) oldProfile.setDisplayName(editedProfile.getDisplayName());
            if(!editedProfile.getAboutMe().equals("")) oldProfile.setAboutMe(editedProfile.getAboutMe());
            if(!editedProfile.getCodechef().equals("")) oldProfile.setCodechef(editedProfile.getCodechef());
            if(!editedProfile.getCodeforces().equals("")) oldProfile.setCodeforces(editedProfile.getCodeforces());
            if(!editedProfile.getGithub().equals("")) oldProfile.setGithub(editedProfile.getGithub());
            if(!editedProfile.getEmail().equals("")) oldProfile.setEmail(editedProfile.getEmail());
            userRepository.save(oldProfile);
            return ResponseEntity.noContent().build();
        }
    }
}

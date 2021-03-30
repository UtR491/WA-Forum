package com.waforum.backend.models;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;

public class SingleAnswerAllCommentsWrapper {
    Posts answer;
    CollectionModel<EntityModel<Comments>>comments;

    public SingleAnswerAllCommentsWrapper(Posts answer, CollectionModel<EntityModel<Comments>> comments) {
        this.answer = answer;
        this.comments = comments;
    }

    public Posts getAnswer() {
        return answer;
    }

    public void setAnswer(Posts answer) {
        this.answer = answer;
    }

    public CollectionModel<EntityModel<Comments>> getComments() {
        return comments;
    }

    public void setComments(CollectionModel<EntityModel<Comments>> comments) {
        this.comments = comments;
    }
}

package com.waforum.backend.util;

import com.waforum.backend.models.Posts;

public class PostsUtil {
    public static boolean postIsAnswer(Posts posts) {
        Integer postTypeId = posts.getPostTypeId();
        // TODO Hard coded for now, make a table of postTypeIds as well.
        return postTypeId == 2;
    }
}

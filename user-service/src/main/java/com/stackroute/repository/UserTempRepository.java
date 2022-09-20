package com.stackroute.repository;

import com.stackroute.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserTempRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<User> getAllUserByEmail(String email){
        Query query = new Query(Criteria.where("userEmailId").is(email));
      return  mongoTemplate.find(query,User.class);
    }
}

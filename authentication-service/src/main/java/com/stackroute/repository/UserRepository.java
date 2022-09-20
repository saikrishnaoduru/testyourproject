package com.stackroute.repository;

import com.stackroute.domain.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    @Query("Select u from User u where userEmail=?1 and userPassword=?2")
    User findByUsernameAndPassword(String userEmail, String userPassword);

}


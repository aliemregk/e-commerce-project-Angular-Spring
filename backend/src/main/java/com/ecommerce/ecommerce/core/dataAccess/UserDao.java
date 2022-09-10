package com.ecommerce.ecommerce.core.dataAccess;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.ecommerce.core.entities.User;

public interface UserDao extends JpaRepository<User, Integer> {

    User getByEmail(String email);

}

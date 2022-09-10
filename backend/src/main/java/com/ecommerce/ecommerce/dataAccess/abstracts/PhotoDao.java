package com.ecommerce.ecommerce.dataAccess.abstracts;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.ecommerce.entities.concretes.Photo;

public interface PhotoDao extends JpaRepository<Photo, Integer> {

    List<Photo> getAllByProductId(int id);
}

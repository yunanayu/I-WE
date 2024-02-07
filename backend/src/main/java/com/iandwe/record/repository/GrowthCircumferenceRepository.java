package com.iandwe.record.repository;

import com.iandwe.record.domain.GrowthCircumference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GrowthCircumferenceRepository extends JpaRepository<GrowthCircumference, Long>  {

    @Query("select c from GrowthCircumference c " +
            "where c.gender = :gender " +
            "and c.month <= :month " +
            "order by c.month desc " +
            "limit 5")
    List<GrowthCircumference> findAllByGenderAndMonth(int gender, int month);
}

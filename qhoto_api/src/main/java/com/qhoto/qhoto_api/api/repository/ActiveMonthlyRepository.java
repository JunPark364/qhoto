package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveMonthly;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.dto.response.QuestOptionRes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActiveMonthlyRepository extends JpaRepository<ActiveMonthly, Long> {

    ActiveMonthly findMonthlyById(Long activemonthlyId);

    List<ActiveMonthly> findByStatusOrderByDateDesc(String status, Pageable pageable);
}

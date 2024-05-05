package com.capstone.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "between")
public class BetweenEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "between_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "missing_people_id")
    private MissingPeopleEntity missingPeople;

    @ManyToOne
    @JoinColumn(name = "search_result_id")
    private SearchResultEntity searchResult;


    public BetweenEntity(MissingPeopleEntity missingPeopleEntity, SearchResultEntity searchResultEntity) {
        this.missingPeople = missingPeopleEntity;
        this.searchResult = searchResultEntity;
    }
//    @ManyToOne
//    @JoinColumn(name = "search_history_id")
//    private SearchHistoryEntity searchHistory;
}

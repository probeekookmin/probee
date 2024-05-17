package com.capstone.server.dto;

import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchHistoryEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class KafkaDto {
    private Long missingPeopleId;
    private Long searchHistoryId;
    private double longitude;
    private double latitude;

    public static KafkaDto fromEntity(MissingPeopleEntity missingPeopleEntity, SearchHistoryEntity searchHistoryEntity) {
        KafkaDto kafkaDto = new KafkaDto();
        kafkaDto.setMissingPeopleId(missingPeopleEntity.getId());
        kafkaDto.setSearchHistoryId(searchHistoryEntity.getId());
        kafkaDto.setLongitude(searchHistoryEntity.getLongitude());
        kafkaDto.setLatitude(searchHistoryEntity.getLatitude());
        return kafkaDto;
    }
}

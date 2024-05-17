package com.capstone.server.dto;

import com.capstone.server.dto.guardian.BetweenRequestDto;
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
    private Long id;
    private BetweenRequestDto betweenRequestDto;
    private Long searchId;

    public static KafkaDto toKafkaDto(Long id, BetweenRequestDto betweenRequestDto, Long searchId) {
        KafkaDto kafkaDto = new KafkaDto();
        kafkaDto.setId(id);
        kafkaDto.setBetweenRequestDto(betweenRequestDto);
        kafkaDto.setSearchId(searchId);
        return kafkaDto;
    }
}

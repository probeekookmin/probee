package com.capstone.server.dto.detection;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SecondDetectionRequestDto {
    private Long missingPeopleId;
    private Long firstSearchId;
    private Long secondSearchId;
    private int topK;
    private List<String> queryImagePath;

}

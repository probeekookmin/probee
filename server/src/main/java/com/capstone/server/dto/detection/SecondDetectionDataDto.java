package com.capstone.server.dto.detection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SecondDetectionDataDto {
    List<String> data;
    Long secondSearchId;
}

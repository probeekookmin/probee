package com.capstone.server.dto.guardian;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BetweenRequestDto {
    private List<Long> resultIds;

}

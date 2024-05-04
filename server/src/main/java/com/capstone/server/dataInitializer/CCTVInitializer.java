package com.capstone.server.dataInitializer;


import com.capstone.server.dto.CCTVDto;
import com.capstone.server.model.CCTVEntity;
import com.capstone.server.repository.CCTVRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CCTVInitializer implements CommandLineRunner {
    @Autowired
    private CCTVRepository cctvRepository;
    @Value("${custom.initializer.enabled}")
    private boolean initializerEnabled;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        try {
            if (initializerEnabled) {
                CCTVEntity cctvEntity = new CCTVDto(1L, 37.611598, 126.996740).toEntity();
                cctvRepository.save(cctvEntity);

                cctvEntity = new CCTVDto(2L, 37.610237, 126.997389).toEntity();
                cctvRepository.save(cctvEntity);

                cctvEntity = new CCTVDto(3L, 37.612041, 126.994463).toEntity();
                cctvRepository.save(cctvEntity);
            }

        } catch (Exception e) {
            System.out.println("CCTV Alreay prepared");
        }

    }


}

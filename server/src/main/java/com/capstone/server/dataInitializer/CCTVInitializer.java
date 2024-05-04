package com.capstone.server.dataInitializer;


import com.capstone.server.model.CCTVEntity;
import com.capstone.server.repository.CCTVRepository;
import jakarta.transaction.Transactional;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.PrecisionModel;
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
                GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
                CCTVEntity cctvEntity = new CCTVEntity();
                cctvEntity.setId(1L);
                cctvEntity = new CCTVEntity();
                cctvEntity.setGps(geometryFactory.createPoint(new Coordinate(37.611598, 126.996740)));
                cctvRepository.save(cctvEntity);

                cctvEntity = new CCTVEntity();
                cctvEntity.setId(2L);
                cctvEntity.setGps(geometryFactory.createPoint(new Coordinate(37.610237, 126.997389)));
                cctvRepository.save(cctvEntity);

                cctvEntity = new CCTVEntity();
                cctvEntity.setId(3L);
                cctvEntity.setGps(geometryFactory.createPoint(new Coordinate(37.612041, 126.994463)));
                cctvRepository.save(cctvEntity);
            }

        } catch (Exception e) {
            System.out.println("CCTV Alreay prepared");
        }

    }


}

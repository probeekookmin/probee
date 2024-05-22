package com.capstone.server.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.LongDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import com.capstone.server.dto.KafkaDto;

@EnableKafka
@Configuration
public class KafkaConsumerConfig {
    
    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;
    @Value("${spring.kafka.consumer.first-group-id}")
    private String firstGroupId;
    @Value("${spring.kafka.consumer.second-group-id}")
    private String secondGroupId;
    @Value("${spring.kafka.consumer.auto-offset-reset}")
    private String offsetReset;


    @Bean
    public ConsumerFactory<String, Long> longConsumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, firstGroupId);
        props.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, 12000000); // 200분
        props.put(ConsumerConfig.REQUEST_TIMEOUT_MS_CONFIG, 12000000); // 200분
        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), new LongDeserializer());
    }

    // Kafka Listener Container Factory for Long
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Long> kafkaLongListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, Long> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(longConsumerFactory());
        return factory;
    }

    @Bean
    public ConsumerFactory<String, KafkaDto> jsonConsumerFactory() {
        JsonDeserializer<KafkaDto> jsonDeserializer = new JsonDeserializer<>(KafkaDto.class);
        jsonDeserializer.addTrustedPackages("com.capstone.server.dto");

        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, secondGroupId);
        props.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, 12000000); // 200분
        props.put(ConsumerConfig.REQUEST_TIMEOUT_MS_CONFIG, 12000000); // 200분
        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), new JsonDeserializer<>(KafkaDto.class));
    }

    // Kafka Listener Container Factory for Long
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, KafkaDto> kafkaJsonListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, KafkaDto> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(jsonConsumerFactory());
        return factory;
    }
}
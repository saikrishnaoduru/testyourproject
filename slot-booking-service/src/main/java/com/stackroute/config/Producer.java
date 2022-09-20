package com.stackroute.config;


import com.stackroute.dto.SlotBookingDto;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    private RabbitTemplate rabbitTemplate;
    private DirectExchange exchange;

    @Autowired
    public Producer(RabbitTemplate rabbitTemplate, DirectExchange exchange) {
        super();
        this.rabbitTemplate = rabbitTemplate;
        this.exchange = exchange;
    }

    public void sendMessageToRabbitMq(SlotBookingDto dto)
    {
        rabbitTemplate.convertAndSend(exchange.getName(),"user_routing",dto);
    }


    public void sendMessageToRabbitMqOnDelete(SlotBookingDto dto)
    {
        rabbitTemplate.convertAndSend(exchange.getName(),"user_delete",dto);
    }
}


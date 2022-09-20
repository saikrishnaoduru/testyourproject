package com.stackroute.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfiguration {

    private String exchangeName = "user_exchange";
    private String registerQueue="user_queue";

    private String deleteQueue="user_delete";

    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange(exchangeName);
    }

    @Bean
    public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Queue registerQueue()
    {
        return new Queue(registerQueue,false);
    }

    @Bean
    Binding bindingUser(Queue registerQueue, DirectExchange exchange)
    {
        return BindingBuilder.bind(registerQueue()).to(exchange).with("user_routing");
    }

    @Bean
    public Queue deleteQueue()
    {
        return new Queue(deleteQueue,false);
    }

    @Bean
    Binding deleteUser(Queue deleteQueue, DirectExchange exchange)
    {
        return BindingBuilder.bind(deleteQueue()).to(exchange).with("user_delete");
    }
}

package com.ies2324.projBackend.config;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.ies2324.projBackend.services.JwtService;
import com.ies2324.projBackend.services.UserService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class WebSocketChannelInterceptor implements ChannelInterceptor {
    final JwtService jwtService;
    final UserService userService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
      StompHeaderAccessor accessor =
          MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
      if (StompCommand.CONNECT.equals(accessor.getCommand())) {
        String jwt = accessor.getFirstNativeHeader("Authorization").substring(7);
        String userEmail = jwtService.extractSubject(jwt);

        UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userEmail);
        if (userEmail != null && !userEmail.isEmpty() && jwtService.isTokenValid(jwt, userDetails)) {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                    null, userDetails.getAuthorities());
            accessor.setUser(authToken);
          }
      }
      return message;
    }
}
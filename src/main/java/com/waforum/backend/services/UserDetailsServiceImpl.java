package com.waforum.backend.services;

import com.waforum.backend.exceptions.RegistrationNumberNotFoundException;
import com.waforum.backend.models.User;
import com.waforum.backend.models.UserDetailsImpl;
import com.waforum.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws RegistrationNumberNotFoundException {
        System.out.println("Inside userdetailsServiceImpl Username = " + username);
        Integer registrationNumber = Integer.parseInt(username);
        List<User> users = userRepository.findAll();
        System.out.println("Users : ");
        for(User user : users) {
            System.out.println(user);
        }
        User user = userRepository.findByRegistrationNumber(registrationNumber);
        System.out.println("user = " + user);
        if(user == null)
            throw new RegistrationNumberNotFoundException(registrationNumber);
        return new UserDetailsImpl(user);
    }

    public UserDetailsImpl loadUserByRegistrationNumber(Integer registrationNumber) throws RegistrationNumberNotFoundException {
        User user = userRepository.findByRegistrationNumber(registrationNumber);
        if(user == null)
            throw new RegistrationNumberNotFoundException(registrationNumber);
        return new UserDetailsImpl(user);
    }
}
